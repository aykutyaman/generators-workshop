// `request(..)` is a Promise-aware Ajax utility
var request = require('../lib/requester.js').request;

var res = [];

function *reqData(url) {
  var data = yield request(url);

  // transfer control
  yield;

  res.push(data);
}

var it1 = reqData( "http://some.url.1" );
var it2 = reqData( "http://some.url.2" );

var p1 = it1.next().value;
var p2 = it2.next().value;

p1.then(function(data) {
  it1.next(data)
});

p2.then(function(data) {
  it2.next(data)
});

Promise.all([p1, p2])
  .then(function() {
    it1.next();
    it2.next();
  });
