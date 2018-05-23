const request = require('supertest')('https://rd-rdsg-openapi.auto.mydlink.com');
require('chai').should();

const config = require('../fakeJson');
const lib = require('../lib');

describe('#UpgradeFirmware,', () => {
  const db = new Object;
  describe('[one device]', () => {
    it.only('upgrade my router', (done) => {
      let body = lib.initSend(config.default);
      body = lib.setIntent(body, 'UpgradeFirmware');
      request
        .post('/google-home/custom-api')
        .set('Content-Type', 'application/json;charset=utf-8')
        .send(body)
        .expect(200)
        .end((err, res)=>{
          if (err) throw err;
          db.parameters = res.body.outputContexts[0].parameters;
          let resultString1 = 'OK, please wait.';
          let resultString2 = 'Your firmware is already up to date.';
          let textToSpeech1 = lib.ssmlToText(res.body.payload.google.richResponse.items[0].simpleResponse.textToSpeech);
          let textToSpeech2 = lib.ssmlToText(res.body.payload.google.richResponse.items[1].simpleResponse.textToSpeech);
          textToSpeech1.should.equal(resultString1);
          textToSpeech2.should.equal(resultString2);
          return done();
        });
    });
    it('yes', (done) => {
      let body = lib.initSend(config.default, db.parameters);
      body = lib.setIntent(body, 'UpgradeFirmware - yes');
      request
        .post('/google-home/custom-api')
        .set('Content-Type', 'application/json;charset=utf-8')
        .send(body)
        .expect(200)
        .end((err, res)=>{
          if (err) throw err;
          let resultString = 'OK, your router is rebooting. It may take up to 2 minutes to come back online.';
          let textToSpeech = lib.ssmlToText(res.body.payload.google.richResponse.items[0].simpleResponse.textToSpeech);
          textToSpeech.should.equal(resultString);
          return done();
        });
    });
    it('no', (done) => {
      let body = lib.initSend(config.default, db.parameters);
      body = lib.setIntent(body, 'UpgradeFirmware - no');
      request
        .post('/google-home/custom-api')
        .set('Content-Type', 'application/json;charset=utf-8')
        .send(body)
        .expect(200)
        .end((err, res)=>{
          if (err) throw err;
          let resultString = 'OK, canceled';
          let textToSpeech = lib.ssmlToText(res.body.payload.google.richResponse.items[0].simpleResponse.textToSpeech);
          textToSpeech.should.equal(resultString);
          return done();
        });
    });
    it.skip('uncertain', (done) => {
      let body = lib.initSend(config.default, db.parameters);
      body = lib.setIntent(body, 'UpgradeFirmware - uncertain');
      request
        .post('/google-home/custom-api')
        .set('Content-Type', 'application/json;charset=utf-8')
        .send(body)
        .expect(200)
        .end((err, res)=>{
          if (err) throw err;
          let resultString = 'I\'m sorry, I didn\'t catch that. Do you want to reboot your router?';
          let textToSpeech = lib.ssmlToText(res.body.payload.google.richResponse.items[0].simpleResponse.textToSpeech);
          textToSpeech.should.equal(resultString);
          return done();
        });
    });
  });
});