*** Settings ***
Documentation     Reusable keywords and variables.
Library           CustomLibrary.py

*** Variables ***
&{ADMIN}      login=admin    pwd=@RBTFRMWRK@


*** Keywords ***
Login Admin
    Login User    ${ADMIN}[login]    ${ADMIN}[pwd]

Print All Users
    ${users}=    Get All Users
    FOR    ${user}    IN    @{users}
        Log Many    @{user.items()}
    END
