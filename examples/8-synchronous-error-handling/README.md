Exercise 8: Synchronous Error Handling
======================================
The `yield`-pause nature of generators means that not only do we get synchronous-looking
`return` values from async function calls, but we can also synchronously catch errors
from those async function calls.