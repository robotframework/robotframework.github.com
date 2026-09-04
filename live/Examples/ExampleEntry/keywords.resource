*** Settings ***
Documentation     This is a resource file, that can contain variables and keywords.
...               Keywords defined here can be used where this Keywords.resource in loaded.
Library           CustomLibrary.py


*** Keywords ***
Connect to Server
    Connect    fe80::aede:48ff:fe00:1122

Close Server Connection
    Disconnect

Login User
    [Arguments]    ${login}    ${password}
    Set Login Name    ${login}
    Set Password    ${password}
    Execute Login

Verify Valid Login
    [Arguments]    ${exp_full_name}
    ${version}=    Get Server Version
    Should Not Be Empty    ${version}
    ${name}=    Get User Name
    Should Be Equal    ${name}    ${exp_full_name}

Verify Unauthorised Access
    Run Keyword And Expect Error    PermissionError*    Get Server Version

Login Admin
    [Documentation]    'Login Admin' is a Keyword.
    ...                It calls 'Login User' from 'CustomLibrary.py'
    Login User    admin    @RBTFRMWRK@
    Verify Valid Login    Administrator
