const Firebase = require('firebase');
const crypto = require('crypto');
const config = require('./../config');

const fb = new Firebase(config.FB_DB);

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

fb.authWithCustomToken(config.FB_MASTER_SECRET).then((authData) => {

  // listen for child_added event in the users
  fb.child('users').on('child_added', (snapShot) => {
    // check if we have a corresponding verification entry
    const uid = snapShot.val().uid;

    fb.child(`meta/users/${uid}`).once('value').then((metaSnapShot) => {
      if (metaSnapShot.val() === null) {
        const generatedCode = generateUniqueCode();
        // we ought to create it
        fb.child(`meta/users/${uid}`).set({
          verified: false,
          code: generatedCode
        }).then(() => {
          // TODO send an email
        });
      }
    });
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
