 
require('chai').should();

const config = require('../fakeJson');
const lib = require('../lib');

describe('#DisableGuestNetwork,', () => {
  const db = new Object;
  describe('[one device]', () => {
    it('disable my guest zone', (done) => {
      let body = lib.initSend(config.default);
      body = lib.setIntent(body, 'DisableGuestNetwork');
       lib.request
        .post('/google-home/custom-api')
        .set('Content-Type', 'application/json;charset=utf-8')
        .send(body)
        .expect(200)
        .end((err, res)=>{
          if (err) throw err;
          let resultString = 'OK, guest WiFi is disabled.';
          let textToSpeech = lib.ssmlToText(res.body.payload.google.richResponse.items[0].simpleResponse.textToSpeech);
          textToSpeech.should.equal(resultString);
          return done();
        });
    });
  });
});