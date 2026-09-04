## Simple Example

This example contains a single test case for user login. It uses a mocked backend api for user management.

### Test Suite

This test suite *TestSuite.robot* contains a two test cases **"Login User with Password"** and **"Denied Login with Wrong Password"**. This test case calls keywords from the resource file *keywords.resource*.

### Resource File

*keywords.resource* contains keyword definitions. The resource file also uses a python based keywords from the library *CustomLibrary.py* for more specialised functionality. Countless community made libraries exist that extend Robot Framework in various ways!