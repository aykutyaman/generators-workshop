/**
 * Imagine you're producing a series of values where each value has a definable relationship to the previous value. 
 * You're going to need a stateful producer that remembers the last value.
 */

// implement that with a function closure
var gimmeSomething = (function() {
  var last;
  return function() {
    if (last === undefined) {
      last = 1;
    } else {
      last = (3 * last) + 6
    }
    return last;
  }
})();

gimmeSomething(); // 1
gimmeSomething(); // 9
gimmeSomething(); // 33
gimmeSomething(); // 105


// the same functionality produced with an iterator
var myIterator = function() {
  var nextVal, finish = false;
  return {
    // needed for retriving iterator from iterable, for `for...of` loops
    [Symbol.iterator]: function() { return this; },

    // standard iterator interface method
    next: function() {
      if (nextVal === undefined) {
	nextVal = 1;
      } else {
	nextVal = (3 * nextVal) + 6;
      }
      if (nextVal > 100000) {
	finish = true;
      }
      return { done: finish, value: nextVal };
    }
  }
}

var something = myIterator();
something.next().value; // 1
something.next().value; // 9
something.next().value; // 33
something.next().value; // 105
something.next().value; // 321



/**
 * with ES6 native loop, we can consume a standard iterator
 * automatically call next() for each iteration
 */
something = myIterator();
for (var v of something) {
  console.log(v); // 33, 105, 321 ... 78729
}



// If we want to loop manually over iterators, calling next and checking done:true,
// we could use something like this:
something = myIterator();
for (var ret; (ret = something.next()) && !ret.done;) {
  console.log(ret.value);
}



