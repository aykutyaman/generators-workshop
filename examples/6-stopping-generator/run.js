function *something() {
  try {
    var nextVal;

    while (true) {
      if (nextVal === undefined) {
	nextVal = 1;
      } else {
	nextVal = (3 * nextVal) + 6;
      }
      yield nextVal;
    }
  }
  // cleanup clause
  finally {
    console.log("cleaning up!");
  }
}

// Early termination of `for..of` (caused by `break`, `return`, an uncaught exception)
// sends a signal to the generator's iterator for it to terminate
// But you may wish to send this signal manually to an iterator, by calling `return()`
// If you specifiy a try...finally clause inside the generator, it will always be run
// even when the generator is externally completed. `return(...)` sets the returned `value`
// whatever passed with `return(..)` call.
var it = something();
for (var v of it) {
  console.log(v);
  if (v > 500) {
    console.log(
      // complete the generator's iterator
      it.return("Hello World").value
    );
    // no `break` needed here
  }
}

// 1 9 33 105 321 969
// cleaning up!
// Hello World
