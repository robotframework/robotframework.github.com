*** Settings ***
Library           CustomLibrary.py
Resource          keywords.resource
Force Tags        INCL


*** Test Cases ***
Log Python Keywords
    ${ret}=    My Keyword    WORLD
    Log To Console    ${ret}   sdfsdf sdfsdf   sdfsdf

Test
    Open Demo Page
    Set Username    demo
    Set Password    mode
    Click Login
    Sleep    1 sec

Failed Test
    Open Demo Page
    Set Username    demo
    Set Password    Wrong
    Click Login
    Fail    faked Fail...
