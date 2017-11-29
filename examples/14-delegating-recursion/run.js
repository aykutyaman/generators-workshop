var request = require('../lib/requester.js').request;
var run = require('../lib/runner.js').run;

function *foo(val) {
  if (val > 1) {
    // generator recursion
    val = yield *foo(val - 1);
  }

  return yield request("http://some.url/?v=" + val);
}

function *bar() {
  var r1 = yield *foo(3);
  console.log(r1);
}

run(bar);
