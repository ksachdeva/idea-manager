FROM node:5.11.0-wheezy
RUN mkdir firejobs

COPY . /firejobs
WORKDIR /firejobs
RUN npm install

CMD [ "node", "workers/account_verifier.js" ]
