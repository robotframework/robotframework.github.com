*** Settings ***
Documentation     This .robot file is a suite
...
...               Keywords are imported from the resource file
Resource          keywords.resource
Library           DateTime


*** Test Cases ***
Simple Test Case
    [Documentation]    Shows some assertion keywords
    Should Be Title Case    Robot Framework
    Should Be Equal    Text123    Text123
    Should Be True    5 + 5 == 10

Test with Keywords
    Store Text    Hail Our Robot
    Add Text To Stored Text     Overlords!
    Verify Stored Text Length    25
    ${current_text}=    Get Stored Text
    Should Be Equal    ${current_text}    Hail Our Robot Overlords!

Test for the year 2022
    [Documentation]    Tests if it is still 2022...
    ${date}=    Get Current Date    result_format=datetime
    Log    ${date}
    Should Be Equal As Strings    ${date.year}    2022

Test Case that fails
    Check Correct Greeting    Hail Our Robot Overlords!
    Check Correct Greeting    Hello World!
