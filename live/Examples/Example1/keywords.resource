*** Settings ***
Library    String
Library    Collections
Library    DateTime

*** Keywords ***
Store Text
    [Arguments]    ${text}
    log    The text "${text}" will be store in the variable \${stored_text}.
    Set Suite Variable    ${stored_text}    ${text}

Add Text To Stored Text
    [Arguments]    ${text}
    ${full_text}=    Set Variable    ${stored_text} ${text}
    Log    The resulting text is: ${full_text}
    Set Suite Variable    ${stored_text}    ${full_text}

Verify Stored Text Length
    [Arguments]    ${expected_length}
    Length Should Be    ${stored_text}    ${expected_length}

Get Stored Text
    [Return]    ${stored_text}

Check Correct Greeting
    [Arguments]    ${greeting}
    IF   $greeting == 'Hail Our Robot Overlords!'
        Log To Console    \nYou may proceed...
    ELSE
        Fail    Sorry. But that was the wrong answer... Bye Bye...
    END