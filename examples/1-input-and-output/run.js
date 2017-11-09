function *foo(x) {
  var y = x * (yield "hello");
  return y;
}

var it = foo(6);

// start `foo(..)`, pause after `var y = x ..` and request the calling code to provide a result value for the `yield`
var res = it.next();
console.log(res.value)

// pass `7` value back in to be result of the paused `yield`
res = it.next(7); 
console.log(res.value);   // 42

/**
 * Note: There's a mismatch between the `yield` and `next(..)` call. In general, you're going
 * to have one more `next(..)` call than you have `yield` statements. Because the first `next(..)`
 * always starts a generator, and runs to the first `yield`. But it's the second `next(..)` call
 * that fullfills the first paused `yield` expression, and the third `next(..)` would fulfill
 * the second `yield`, and so on.
 */
