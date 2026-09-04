## Behaviour-Driven Testing (Gherkin)

This example contains a test case written in a *BDD-style* with *embedded arguments*

### Test Object

We are testing a *fake* Calculator implemented in *Calculator.py*.
It provides the functions
* start_calculator
* calculate_term(term)

### Test Suite

This test suite *(Calculator_Test_Suite.robot)* contains a test written in a *BDD-style*.  
The prefixes *Given/When/Then/And* are dropped when they are matched to the respective keywords in *Calc_keywords.resource*.  
Arguments like `"1 + 1"` are passed as *embedded arguments* to improve the readability.
Note how the embedded arguments like `${term}` or `${expected}` *(in Calc_keywords.resource)* are mentioned in the keyword name and later used as variables inside the keyword.
Adding quotes around embedded arguments is optional - but a good practice to improve readability.  
The Keyword *Set Test Variable* is used to make a variables available everywhere within the test (as the variable scope is limited to the keyword by default).