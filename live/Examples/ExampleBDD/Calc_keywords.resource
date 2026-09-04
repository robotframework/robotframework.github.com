*** Settings ***
Library         Calculator.py

*** Keywords ***
The Calculator Is Running
    Log    Opening Calculator
    Start Calculator

The User Enters The Term "${term}"
    Log    Entering ${term}
    Set Test Variable    ${term}

The User Triggers The Calculation
    Log    Triggering Calculation
    ${result}    Calculate Term    ${term}
    Set Test Variable   ${result}
    
The Result Should Be "${expected}"
    Log    Checking Result
    Should Be Equal As Numbers    ${result}    ${expected}