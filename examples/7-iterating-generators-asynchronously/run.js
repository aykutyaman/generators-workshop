// fake ajax function
function ajax(url, cb) {
  setTimeout(function() {
    cb(null, "Hello World!");
  }, 500);
}

function foo() {
  ajax(
    "www.google.com",
    function(err, data) {
      if (err) {
	// throw an error into the `*main()`
	it.throw(err);
      } else {
	// resume `*main()` with received `data`
	it.next(data); B
      }
    }
  );
}

function *main() {
  try {
    var text = yield foo(); // A
    console.log(text);
  }
  catch (err) {
    console.log(err);
  }
}

var it = main();

// start it all up!
it.next();


/**
 * A: first `foo()` call is made, which returns `undefined`, `yield undefined`.
 * This is ok because the program is not currently relying on `yield`ed value. 
 * We are not using `yield` in a message passing sense, only in a flow control
 * sense to pause/block. 
 * So, the generator pauses at the `yield`, essentially asking the question,
 * "what value should I return to assign to the variable `text`?" Who is going
 * to answer that question?
 */

/**
 * B: Look at `foo()`. If the Ajax request is successful, we call `it.next(data)`
 * That's resuming the generator with the response data, which means that our
 * paused `yield` expression receives that value directly, and that as it restarts
 * the generator code, that value gets assigned to the local variable `text`
 */
