var test = require('tape');
var postImage = require('../index');
var config = require('./test-config');
var fs = require('fs');
var Twit = require('twit');
var assertNoError = require('assert-no-error');

var testCases = [
  {
    opts: {
      twit: new Twit(config),
      dryRun: false,
      base64Image: fs.readFileSync(__dirname + '/wily_swipe.jpg', {encoding: 'base64'}),
      altText: 'This a picture of a cat.',
      caption: 'Check out my cat, Twitter dot com!'
    }
  }
];

testCases.forEach(runTest);

function runTest(testCase) {
  test('Basic test', basicTest);

  function basicTest(t) {
    postImage(testCase.opts, checkResult);

    function checkResult(error, data) {
      assertNoError(t.ok, error, 'No error while posting.');
      if (error) {
        if (data) {
          console.log('data:', data);
        }
      }
      console.log('You should now go to your Twitter account to make sure the image was posted.');
      t.end();
    }
  }
}
