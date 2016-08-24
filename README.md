post-image-to-twitter
==================

An abstraction that uses [Twit](https://github.com/ttezel/twit) to post a base64 encoded image to Twitter.

Installation
------------

    npm install post-image-to-twitter

Usage
-----

    var postImage = require('post-image-to-twitter');
    var postImageOpts = {
      twit: new Twit(credentials),
      base64Image: buffer.toString('base64'),
      altText: 'This a picture of a cat.',
      caption: 'Check out my cat, Twitter dot com!'
    };

    postImage(postImageOpts, wrapUp);

    function wrapUp(error, data) {
      if (error) {
        console.log(error, error.stack);

        if (data) {
          console.log('data:', data);
        }
      }
    }

Tests
-----

Set up a `/tests/test-config.js` file that has Twitter credentials like so:

    module.exports = {
      consumer_key: 'your consumer key',
      consumer_secret: 'your consumer secret',
      access_token: 'your access token',
      access_token_secret: 'etc.'
    };

Then, run `make test`.

License
-------

The MIT License (MIT)

Copyright (c) 2016 Jim Kang

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
