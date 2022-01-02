*** Settings ***
Library           InPageLibrary

*** Keywords ***
Open Demo Page
    Open Browser    Demo
    sleep   1sec

Set Username
   [Arguments]    ${user}
   Type Text    id=username_field   ${user}

Set Password
   [Arguments]    ${pwd}
   Type Text    id=password_field   ${pwd}


Click Login
    Click    id=login_button
