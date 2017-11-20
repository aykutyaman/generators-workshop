// async request call simulation
function request(url) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      resolve("hello world");
    }, 500);
  });
}

// promise aware foo returns a promise after making the Ajax call
function foo(x, y) {
  return request(
    "http://some.url.1/?x=" + x + "&y=" + y
  );
}

/**
 * The natural way to get the most out of Promises and generators is to yeild
 * a promise and wire that Promise to control the generator's iterator.
 */

function *main() {
  try {
    var text = yield foo(11, 32); // yield a promise
    console.log(text);
  }
  catch (err) {
    console.log(err);
  }
}

var it = main();

var p = it.next().value; // yielded promise

// wait for the `p` promise to resolve
p.then( 
  function(text) {
    it.next(text); // wire the promise and iterator
  },
  function(err) {
    it.throw(err); // wire the promise and iterator
  }
)


