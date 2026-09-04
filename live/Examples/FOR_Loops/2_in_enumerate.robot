*** Variables ***
@{letters}    a  b  c  d  e  f  g  h  i  j  k  l  m  n  o  p  q  r  s  t  u  v  w  x  y  z

*** Test Cases ***
Loop with index over letters
    Log To Console    Lists the Alphabet
    FOR    ${index}    ${letter}    IN ENUMERATE    @{letters}
        Log To Console    The ${index + 1}. letter is ${letter}
    END