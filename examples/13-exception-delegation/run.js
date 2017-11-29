function *foo() {
  try {
    yield "B";
  }
  catch (err) {
    console.log("error caught inside `foo()`:", err);
  }

  yield "C";

  throw "D";
}

function *bar() {
  yield "A";

  try {
    yield *foo();
  }
  catch (err) {
    console.log("error caught inside `bar()`:", err);
  }

  yield "E";

  yield *baz();

  // note: can't get here!
  yield "G";
}

function *baz() {
  throw "F";
}

var it = bar();

console.log( "outside:", it.next().value );
// outside: A

console.log( "outside:", it.next( 1 ).value );
// outside: B

console.log( "outside:", it.throw( 2 ).value );
// error caught inside `*foo()`: 2
// outside: C

console.log( "outside:", it.next( 3 ).value );
// error caught inside `*bar()`: D
// outside: E

try {
	console.log( "outside:", it.next( 4 ).value );
}
catch (err) {
	console.log( "error caught outside:", err );
}
// error caught outside: F
