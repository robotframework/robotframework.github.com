*** Settings ***
Library    Collections


*** Variables ***
@{LETTERS}    a  b  c  d  e  f  g  h  i  j  k  l  m  n  o  p  q  r  s  t  u  v  w  x  y  z


*** Test Cases ***
List Variables unpacked
    Log To Console    Lists the Alphabeth
    Log Many    @{LETTERS}    # unpacks the list and hands over 26 arguments
    Log Many    a  b  c  d  e  f  g  h  i  j  k  l  m  n  o  p  q  r  s  t  u  v  w  x  y  z  # same result as before
    Log    ${LETTERS}    # a single variable as argument
    Log    @{LETTERS}    # This fails because LOG has only 6 possible arguments (message, level, html, console, repr, formatter)

Test with Keywords and a list
    Print All Entries Of A List To Console    ${LETTERS}         # a single scalar value

Test with a Keyword that accepts multiple arguments
    Print All Arguments To Console    @{LETTERS}    # unpacke to 26 values
    Print All Arguments To Console    arg1    arg2    arg3    arg4
    Print All Arguments To Console    ${LETTERS}    # just one value...

Test with some Collections keywords
    ${list}=    Create List    1    2    3
    Append To List    ${list}    4    5    6
    ${list2}=    Create List    7    8    9
    ${new_list}=    Combine Lists    ${list}    ${list2}
    ${reversed}=    Reverse List    ${new_list}
    Log To Console    ${reversed}

Test to access list entries
    Log To Console    index 18 & 6 => ${LETTERS}[18] ${LETTERS}[6]
    Log To Console    index 5 to 10 => ${LETTERS}[5:10]   # is a list again
    Log To Console    index start to 5 => ${LETTERS}[:5]   # same as [0:5]
    Log To Console    index 20 to end => ${LETTERS}[20:]
    Log To Console    Last 5 to end => ${LETTERS}[-5:]


*** Keywords ***
Print All Entries Of A List To Console
    [Arguments]    ${list}    # list as a single scalar variable
    FOR    ${element}    IN    @{list}    # unpacked here. see FOR LOOP example
        Log To Console    ${element}
    END

Print All Arguments To Console
    [Arguments]    @{all_args}
    FOR    ${arg}    IN    @{all_args}    # unpacked here. see FOR LOOP example
        Log To Console    ${arg}
    END
