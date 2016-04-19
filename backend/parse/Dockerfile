FROM node:latest
RUN mkdir parse

COPY . /parse
WORKDIR /parse
RUN npm install

ENV APP_ID setYourAppId
ENV MASTER_KEY setYourMasterKey
ENV DATABASE_URI setMongoDBURI

EXPOSE 1337

CMD [ "npm", "start" ]
