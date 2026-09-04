*** Variables ***
@{First Name}    Bruce     Steve     Peter
@{Last Name}     Banner    Rogers    Parker

*** Test Cases ***
Combines two loops
    Log To Console   Full Names:
    FOR    ${first}    ${last}    IN ZIP    ${First Name}    ${Last Name}
        Log To Console    ${first} ${last}
    END
