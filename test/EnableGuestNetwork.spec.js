 
require('chai').should();

const config = require('../fakeJson');
const lib = require('../lib');

describe.only('#EnableGuestNetwork,', () => {
  const db = new Object;
  describe('[one device]', () => {
    it('enable my guest zone on deviceName', (done) => {
      let body = lib.initSend(config.default);
      body = lib.setIntent(body, 'EnableGuestNetwork');
      lib.request
        .post('/google-home/custom-api')
        .set('Content-Type', 'application/json;charset=utf-8')
        .send(body)
        .expect(200)
        .end((err, res)=>{
          if (err) throw err;
          db.parameters = res.body.outputContexts[0].parameters;
          let resultString = 'OK, guest WiFi is enabled, the network name is dlink-guest. Would you like me to tell you the password?';
          let textToSpeech = lib.ssmlToText(res.body.payload.google.richResponse.items[0].simpleResponse.textToSpeech);
          textToSpeech.should.equal(resultString);
          return done();
        });
    });
    it('yes [have password]', (done) => {
      let body = lib.initSend(config.default, db.parameters);
      body = lib.setIntent(body, 'EnableGuestNetwork - yes');
       lib.request
        .post('/google-home/custom-api')
        .set('Content-Type', 'application/json;charset=utf-8')
        .send(body)
        .expect(200)
        .end((err, res)=>{
          if (err) throw err;
          let resultString = 'OK, guest WiFi is enabled, network name is dlink-guest and the password is xewho75109';
          let textToSpeech = lib.ssmlToText(res.body.payload.google.richResponse.items[0].simpleResponse.textToSpeech);
          textToSpeech.should.equal(resultString);
          return done();
        });
    });
    it('yes [have not password]', (done) => {
      let parametersData = JSON.parse(db.parameters.data);
      delete parametersData.password;
      parametersData = JSON.stringify(parametersData);
      let body = lib.initSend(config.default, {data: parametersData});
      body = lib.setIntent(body, 'EnableGuestNetwork - yes');
       lib.request
        .post('/google-home/custom-api')
        .set('Content-Type', 'application/json;charset=utf-8')
        .send(body)
        .expect(200)
        .end((err, res)=>{
          if (err) throw err;
          let resultString = 'OK, guest WiFi is enabled, network name is dlink-guest and there is no password.';
          let textToSpeech = lib.ssmlToText(res.body.payload.google.richResponse.items[0].simpleResponse.textToSpeech);
          textToSpeech.should.equal(resultString);
          return done();
        });
    });
    it('no', (done) => {
      let body = lib.initSend(config.default, db.parameters);
      body = lib.setIntent(body, 'EnableGuestNetwork - no');
       lib.request
        .post('/google-home/custom-api')
        .set('Content-Type', 'application/json;charset=utf-8')
        .send(body)
        .expect(200)
        .end((err, res)=>{
          if (err) throw err;
          let resultString = 'OK';
          let textToSpeech = lib.ssmlToText(res.body.payload.google.richResponse.items[0].simpleResponse.textToSpeech);
          textToSpeech.should.equal(resultString);
          return done();
        });
    });
    it.skip('uncertain', (done) => {
      let body = lib.initSend(config.default, db.parameters);
      body = lib.setIntent(body, 'EnableGuestNetwork - uncertain');
       lib.request
        .post('/google-home/custom-api')
        .set('Content-Type', 'application/json;charset=utf-8')
        .send(body)
        .expect(200)
        .end((err, res)=>{
          if (err) throw err;
          let resultString = 'I\'m sorry, I didn\'t catch that. Would you like me to tell you the password?';
          let textToSpeech = lib.ssmlToText(res.body.payload.google.richResponse.items[0].simpleResponse.textToSpeech);
          textToSpeech.should.equal(resultString);
          return done();
        });
    });
  });
});