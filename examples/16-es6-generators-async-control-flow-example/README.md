Example 16: Generators and Async Control Flow Example
=====================================================
What if there was a function wrapping generator that could detect when you yield a promise,
wait for it to resolve, and then pass the resolved value back into the generator with the
subsequent `.next()` call?
Source: http://bit.ly/2jwliFh
