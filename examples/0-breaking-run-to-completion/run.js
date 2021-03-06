/**
 * Generator is a special kind of function that can start and stop one or more times,
 * and doesn't necessarily ever have to finish.
 */
var x = 1;

function *foo() {
  x++;
  yield; // pause
  console.log("x:", x);
}

function bar() {
  x++;
}

// construct an iterator `it` to control the generator
var it = foo();

// start `*foo()` generator and pause at the yield statement, at this point it.next() call finishes
// *foo() is still running and active, but it's in a paused state.
var f = it.next();
console.log(x);              // 2

bar();
console.log(x);              // 3

// the final it.next() call resumes *foo() generator from where it was paused
it.next();

