 
require('chai').should();

const config = require('../fakeJson');
const lib = require('../lib');

describe.skip('#Help,', () => {
  it('help', (done) => {
    let body = lib.initSend(config.default);
    body = lib.setIntent(body, 'Help');
    request
      .post('/google-home/custom-api')
      .set('Content-Type', 'application/json;charset=utf-8')
      .send(body)
      .expect(200)
      .end((err, res)=>{
        if (err) throw err;
        let resultString = 'Okay. Start managing your Wi-Fi with the following options: Enable and Disable Guest Wi-Fi ; Ask for your guest Wi-Fi name and password ; Reboot your router. Which one do you want?';
        let textToSpeech = lib.ssmlToText(res.body.payload.google.richResponse.items[0].simpleResponse.textToSpeech);
        textToSpeech.should.equal(resultString);
        return done();
      });
  });
});