/**
 * This is a helper function that controls an iterator
 */
function step(gen) {
    // initialize the generator
    var it = gen();
    var last;

    // returns a function which, when called, advances the
    // iterator by one step. Additionally, the previously `yield`ed out
    // value is sent back in the next step.
    return function() {
	// whatever is `yield`ed out, just
	// send it right back in the next time!
	last = it.next(last).value;
    }
}

var a = 1;
var b = 2;

function *foo() {
    a++;
    yield;
    b = b * a;
    a = (yield b) + 3;
}

function *bar() {
    b--;
    yield;
    a = (yield 8) + b;
    b = a * (yield 2);
}

var s1 = step(foo);
var s2 = step(bar);

// run `*foo()` completely first
s1();
s1();
s1(); // a:7, b:4

// now run `*bar()`
s2(); // b: 1, last: undefined
s2(); // b = 1 , last:8
s2(); // a: 9
s2();

console.log(a, b);

