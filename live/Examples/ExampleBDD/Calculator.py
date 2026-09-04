def start_calculator():
    print("Calculator Started")

def calculate_term(term):
    """
    Interpret term as a mathematical expression
    and return the result
    """
    print("Calculating Term:", term)
    return eval(term)