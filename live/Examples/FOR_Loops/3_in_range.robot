*** Settings ***
Documentation    IN RANGE can get between 1 and 3 arguments.
...              Be aware that as in python the "end" is excluded.


*** Test Cases ***
Loop 10 times
    Log To Console    start: 0 ,inc: 1 , end:10
    FOR    ${num}    IN RANGE    10
        Log To Console    ${num}
    END

Loop 10 times starting with 1
    Log To Console    start: 1 ,inc: 1 , end:11
    FOR    ${num}    IN RANGE    1    10
        Log To Console    ${num}
    END

Loop starting with 0 to 100 in steps of 5
    Log To Console    start: 1 ,inc: 1 , end:11
    FOR    ${num}    IN RANGE    0    101    5
        Log To Console    ${num}
    END

Countdown from 10 to 0 in 10 seconds
    Log To Console    start: 1 ,inc: 1 , end:11
    FOR    ${num}    IN RANGE    10    -1    -1
        Log To Console    ${num}
        Exit For Loop If    ${num} == 0
        Sleep   1sec
    END
    Log To Console    🎉🥳 HAPPY NEW YEAR !!! 🍾