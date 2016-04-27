const Firebase = require('firebase');
const crypto = require('crypto');
const _ = require('lodash');
const mailer = require('./../mailer');
const config = require('./../config');

const fb = new Firebase(config.FB_DB);

const getDomainFromEmail = (email) => {
  const email_string_array = email.split("@");
  return email_string_array[email_string_array.length - 1];
};

const generateUniqueCode = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUWXYZ0123456789";
  const howMany = 5;
  const rnd = crypto.randomBytes(howMany),
    value = new Array(howMany),
    len = chars.length;

  for (var i = 0; i < howMany; i++) {
    value[i] = chars[rnd[i] % len];
  }

  return value.join('');
};

const startProcess = (whiteListDomains) => {

  const domains = whiteListDomains.split(';');

  fb.authWithCustomToken(config.FB_MASTER_SECRET).then((authData) => {

    // listen for child_added event in the users
    fb.child('users').on('child_added', (snapShot) => {
      // check if we have a corresponding verification entry
      const uid = snapShot.val().uid;
      const email = snapShot.val().email;

      // verify if the supplied email/domain is in our white List
      if (_.includes(domains, getDomainFromEmail(email))) {
        fb.child(`meta/users/${uid}`).once('value').then((metaSnapShot) => {
          // if the node does not exists then create one
          if (metaSnapShot.val() === null) {
            const generatedCode = generateUniqueCode();
            // we ought to create it
            fb.child(`meta/users/${uid}`).set({
              verified: false,
              code: generatedCode
            }).then(() => mailer.sendEmailVerification(generatedCode, email));
          }
        });
      } else {
        // what should we do ?
        console.warn(`An email ${email} that is not whiteListed was used ..`);
      }
    });

    // listen for child_added event in code_verifier/users
    fb.child('code_verifier').on('child_added', (snapShot) => {
      // compare the code with the one that we sent out earlier
      const supplied_code_value = snapShot.val().code;
      const entryKey = snapShot.key();

      fb.child(`meta/users/${entryKey}`).once('value').then((metaSnapShot) => {
        const generated_code_value = metaSnapShot.val().code;
        if (supplied_code_value === generated_code_value) {
          // set verified to true
          fb.child(`meta/users/${entryKey}`).set({
            verified: true
          });
          // destroy the code_verifier node
          fb.child(`code_verifier/${entryKey}`).remove();
        }
      });
    });

  });

};

fb.authWithCustomToken(config.FB_MASTER_SECRET).then((authData) => {
  fb.child('meta/app').once('value').then((appSnapShot) => {
    const requireEmailVerification = appSnapShot.val().requireEmailVerification;

    if (requireEmailVerification) {
      console.info('Starting the worker ...');
      startProcess(appSnapShot.val().whiteListDomains);
    } else {
      // we do not need really need this worker
      console.info('Email verification is not required !');
      process.exit(0);
    }
  });
});
