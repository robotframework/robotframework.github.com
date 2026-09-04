## Variables

This examples contains multiple tests with different variable types.

### ${Scalar} Variables

Scalar variables are single instances of a variable. It is used as is.
It does not matter if the variable contains a list, object, dictionary or just a string or integer.

### @{List-Like} Variables

Lists or list-like variables, which can be iterated, can be "unpacked".
A variable containing a list with a $ sign as prefix is still a single variable.
A variable containing a list with a @ sign is unpacked and handled as multiple values.
You can compare it with a box of 10 cookies. ${box} is just the box, with all the 10 cookies inside.
@{box} are 10 cookies without the box. When you hand over @{box} to a keyword, that keyword gets 10 arguments.

Accessing a single element of the box needs the variable as box.
So in our case the prefix shall be $.
${box}[1] is the cookie with the index 1.

### &{Dictionary} Variables

The & sign as prefix causes that a variable is handled as dictionary or also a list of key=value pairs.
Similar to the list variables, dictionary variables are unpacked with the & sign but handle as single variable with the $ sign as prefix.

Accessing a single value by its key, requires in our case the prefix $ again.

- ${dict}[name] accesses the value behind the key "name".
- ${dict.name} is an alternative and sometime handy method to access elements of a dictionary.
