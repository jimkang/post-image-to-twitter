var waterfall = require('async-waterfall');
var pick = require('lodash.pick');
var callNextTick = require('call-next-tick');

// TODO: This could be in its own package.
function postImage(opts, allDone) {
  var twit;
  var dryRun;
  var base64Image;
  var altText;
  var caption;
  var in_reply_to_status_id;

  if (opts) {
    twit = opts.twit;
    dryRun = opts.dryRun;
    base64Image = opts.base64Image;
    altText = opts.altText;
    caption = opts.caption;
    in_reply_to_status_id = opts.in_reply_to_status_id;
  }

  if (base64Image.length < 10) {
    callNextTick(
      allDone, new Error('Received bad base64 image in postImage opts: ' + JSON.stringify(opts))
    );
    return;
  }

  var optSummary = pick(opts, 'altText', 'caption', 'in_reply_to_status_id');
  optSummary.base64Image = base64Image.substr(0, 100) + '[truncated]';
  console.log('Posting image for', altText, JSON.stringify(optSummary));

  var mediaPostData;

  waterfall(
    [
      postMedia,
      postMetadata,
      postTweet
    ],
    allDone
  );

  function postMedia(done) {
    var mediaPostOpts = {
      media_data: base64Image 
    };
    twit.post('media/upload', mediaPostOpts, done);
  }

  function postMetadata(theMediaPostData, response, done) {
    console.log('Posted media for', altText, JSON.stringify(theMediaPostData));

    // Save this for other functions in the above scope.
    mediaPostData = theMediaPostData;

    var metaParams = {
      media_id: mediaPostData.media_id_string,
      alt_text: {
        text: altText
      }
    };
    twit.post('media/metadata/create', metaParams, done);
  }

  // https://dev.twitter.com/rest/reference/post/media/metadata/create
  // metaDataPostData will be empty if the metadata post was sucessful!
  function postTweet(metaDataPostData, response, done) {
    console.log('Successfully posted metadata. Now posting tweet for', altText);

    var body = {
      status: caption,
      media_ids: [
        mediaPostData.media_id_string
      ]
    };
    if (in_reply_to_status_id) {
      body.in_reply_to_status_id = in_reply_to_status_id;
    }

    if (dryRun) {
      console.log('Would have tweeted: using', JSON.stringify(body, null, '  '));
      callNextTick(done);
    }
    else {
      twit.post('statuses/update', body, done);
    }
  }
}

module.exports = postImage;
