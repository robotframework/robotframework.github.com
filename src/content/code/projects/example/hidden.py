from TestObject import t, UserRight


session = ""


def login_user(login, password):
    global session
    session = t.authenticate(login, password)


def get_all_users():
    return t.get_user_all(session)


def create_new_user(
    name, login, password, right: UserRight
):
    user_id = t.post_new_user(session, name, login)
    t.put_user_password(session, password, user_id)
    t.put_user_right(session, right, user_id)


def get_userdetails(user_id=None):
    return t.get_user(session, user_id)
