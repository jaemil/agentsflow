def get_name(x):
    if isinstance(x, type):
        # x is a class
        return x.__name__
    elif isinstance(x, str):
        # x is a string
        return x
    else:
        # x is an instance of a class or a function
        return x.__class__.__name__ if not callable(x) else x.__name__
