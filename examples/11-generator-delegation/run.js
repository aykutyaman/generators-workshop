var request = require('../lib/requester.js').request;
var run = require('../lib/runner.js').run;


function *foo() {
  var r2 = yield request("http://some.url.2");
  var r3 = yield request("http://some.url.3?v=" + r2);

  return r3;
}

function *bar() {
  var r1 = yield request("http://some.url.1");

  // delegating to `foo()` via `yield`
  var r3 = yield *foo();                         // A
  
  console.log(r3);
}

run(bar);
  
/**
 * A: Firstly, calling foo() creates an iterator. Then, `yield *` delegates/transfers
 * the iterator instance control(of the present `*bar()`) over to this other `*foo()` 
 * iterator.
 */
