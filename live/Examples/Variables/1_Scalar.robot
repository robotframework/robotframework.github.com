*** Variables ***
${GLOBAL_VAR1}    This is a global variable!
${ANOTHER_GLOBAL}=    Equal sign is optional but sometimes helpful.


*** Test Cases ***
Test Case With Variables
    Log     ${GLOBAL_VAR1}
    Log     String concadination Is simple with "${GLOBAL_VAR1}" and "${ANOTHER_GLOBAL}"
    Log     Escaping with backslash. Then you can use names like \${GLOBAL_VAR1}

Test with Numbers
    Log    1 is a string and ${1} is an integer...
    ${result}=    Evaluate    1 + 1  # evaluates a python expression
    Should Be Equal    ${result}    ${2}
    Should Not Be Equal    ${result}    2

Test Case with Return Values
    Log    Return Values can be assigned to Variables
    ${the_returned_text}=    Get Hello World As Text
    Log To Console    ${the_returned_text}

Test With Arguments and Return Values
    ${len}=    Count the Length and Log To Console    Hello Robot Framework Community!
    Should Be Equal    ${len}    ${32}

Test With Environment Variables
    Log    Environment Variables are prefixed with % sign.
    Log To Console    The /%{USER} is: %{USER}
    Log To Console    The /%{HOME} is: %{HOME}

Test with BuiltIn Variables of Robot Framework
    Log Variables
    ${all_vars}=    Get Variables
    FOR    ${var}    IN    @{all_vars}
        ${value}=    Get Variable Value    ${var}
        Log To Console    ${var} : ${value}
    END


*** Keywords ***
Get Hello World As Text
    Log   this keyword just returns the string "Hello World"
    RETURN    Hello World

Count the Length and Log To Console
    [Arguments]    ${text}
    ${length}=    Get Length    ${text}
    Log To Console    \nThe Text "${text}" has ${length} characters...
    RETURN    ${length}