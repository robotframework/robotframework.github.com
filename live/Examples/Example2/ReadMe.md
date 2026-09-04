## Advanced Example

This example contains some more advanced features of Robot Framework.

### Test Object

We are testing here a backend api for user management. Users must authenticate before interaction.
Depending on the authorizations, different actions can be carried out:

- **Administrators** can create users, alter user data and fetch details about existing users.
- **Normal users** can just fetch their own information and only alter their own details.
- **Guest users** can login but not modify anything.

### Test Suite

This test suite (*test.robot*) contains six test cases such as *Access All Users With Admin Rights*.
Test cases are calling either keywords from the resource file *keywords.resource* or the Library
*CustomLibrary.py*

*keywords.resource* contains examples of variables, Return-Values, IF/ELSE and FOR-Loops.