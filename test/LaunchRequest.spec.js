 
require('chai').should();

const config = require('../fakeJson');
const lib = require('../lib');

describe.skip('#LaunchRequest,', () => {
  it('talk to big wifi', (done) => {
    let body = lib.initSend(config.default);
    body = lib.setIntent(body, 'LaunchRequest');
    request
      .post('/google-home/custom-api')
      .set('Content-Type', 'application/json;charset=utf-8')
      .send(body)
      .expect(200)
      .end((err, res)=>{
        if (err) throw err;
        let resultString = 'Welcome to D-Link Wi-Fi on Google Assistant, the new way to control your D-Link Cloud enabled router without lifting a finger. To begin, say help.';
        let textToSpeech = lib.ssmlToText(res.body.payload.google.richResponse.items[0].simpleResponse.textToSpeech);
        textToSpeech.should.equal(resultString);
        return done();
      });
  });
});