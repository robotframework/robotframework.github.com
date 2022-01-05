*** Settings ***
Documentation     A test suite for valid login.
...
...               Keywords are imported from the resource file
Resource          keywords.resource

*** Test Cases ***
Test 1
    Login Admin
    Print All Users

Test 2
    Login Admin
    Create New User
    ...    name=Peter Parker
    ...    login=spider
    ...    password=123spiderman321
    ...    right=user
    Print All Users

Test 3
    Login User    spider    123spiderman321
    ${details}   Get Userdetails
    Log To Console    \n${details}

Test Fails
    Login User    spider    123spiderman321
    Print All Users