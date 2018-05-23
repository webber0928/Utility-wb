 
require('chai').should();

const config = require('../fakeJson');
const lib = require('../lib');

describe('#RebootDevice,', () => {
  const db = new Object;
  describe('[one device]', () => {
    it('reboot my router', (done) => {
      let body = lib.initSend(config.default);
      body = lib.setIntent(body, 'RebootDevice');
       lib.request
        .post('/google-home/custom-api')
        .set('Content-Type', 'application/json;charset=utf-8')
        .send(body)
        .expect(200)
        .end((err, res)=>{
          if (err) throw err;
          db.parameters = res.body.outputContexts[0].parameters;
          let resultString = 'OK, are you sure you want to reboot your router?';
          let textToSpeech = lib.ssmlToText(res.body.payload.google.richResponse.items[0].simpleResponse.textToSpeech);
          textToSpeech.should.equal(resultString);
          return done();
        });
    });
    it('yes', (done) => {
      let body = lib.initSend(config.default, db.parameters);
      body = lib.setIntent(body, 'RebootDevice - yes');
       lib.request
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
      body = lib.setIntent(body, 'RebootDevice - no');
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
      body = lib.setIntent(body, 'RebootDevice - uncertain');
       lib.request
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