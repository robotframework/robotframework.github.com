## For loops

Repeating same actions several times is quite a common need in test automation. With Robot Framework, test libraries can have any kind of loop constructs, and most of the time loops should be implemented in them. Robot Framework also has its own for loop syntax, which is useful, for example, when there is a need to repeat keywords from different libraries.

### FOR ${element} IN @{list}

The most common and simplest loop, is the loop over all values of something list-like.
Unpacked variables (with @ prefix) or multiple values can be used.

### FOR ${index} ${element} IN ENUMERATE @{list}

The FOR loop with enumeration works the same as the previous loop, but adds an index (0-based).

### FOR ${number} IN RANGE

For in-range loops iterate over a range of numbers with a given increment.
Start defaults to 0 and increment defaults to 1.

### FOR ${char} ${num} IN ZIP ${letters} ${numbers}

For in-zip loops iterate over two list like variables of the same size
and picks the elements with the same index together.