var runner = require('./runner.js');

// async request call simulation
function request(url) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      resolve("hello world");
    }, 500);
  });
}

// normal function, not a generator
function bar(url1, url2) {
  // make both requests "in parallel"
  return Promise.all([
    request(url1),
    request(url2)
  ]);
}

function *foo() {
  // hide the Promise-based concurrency details
  var results = yield bar(
    "url1",
    "url2"
  );

  var r1 = results[0];
  var r2 = results[1];

  var r3 = yield request(
    "url.3?v=" + r1 + "," + r2
  );

  console.log(r3);
}

runner.run(foo);
