from enum import IntEnum
import random
from hashlib import pbkdf2_hmac
from os import urandom
import secrets
from uuid import uuid5, NAMESPACE_URL
import json
import re
from time import time
from typing import Dict, List


class UserRight(IntEnum):
    none = 0
    guest = 1
    user = 2
    admin = 4


ADMIN = UserRight.admin
USER = UserRight.user
GUEST = UserRight.guest
NONE = UserRight.none

IPv6_matcher = r"(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))"
IPv4_matcher = r"((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])"

class User:
    def __init__(self, name: str, login: str):
        self.user_id = str(uuid5(NAMESPACE_URL, name))
        self.name = name
        self.pwdhash = ""
        self._login = ""
        self._salt = urandom(32)
        self.login = login
        self.right = UserRight.none
        self.active = False

    @property
    def login(self):
        return self._login

    @login.setter
    def login(self, value):
        match = re.fullmatch(r"[A–Za-z0–9\.-_!#\^~]{,64}", value)
        if not match:
            raise ValueError("Login contains invalid characters or is too long!")
        self._login = value

    @property
    def password(self):
        return self.pwdhash

    @password.setter
    def password(self, value: str):
        if len(value) < 10:
            raise ValueError("Given password is too short!")
        self.active = True
        self._salt = urandom(32)
        self.pwdhash = self._hash(value)

    def _hash(self, value):
        return pbkdf2_hmac("sha256", value.encode("utf-8"), self._salt, 1000)

    def check_password(self, password):
        return self.password == self._hash(password) and self.active

    def dump(self):
        return {
            "name": self.name,
            "login": self.login,
            "right": self.right.name,
            "active": self.active,
        }


class Session:
    def __init__(self, login) -> None:
        self.login = login
        self.last_request = time()
        self.token = ""


class TestObject:
    def __init__(self, ip=None) -> None:
        self.ip = ip
        self.user_ids: Dict[str, str] = {}
        self.users: Dict[str, User] = {}
        self.user_sessions: Dict[str, User] = {}
        self._create_user("Administrator", "admin", "@RBTFRMWRK@", ADMIN)
        self._create_user("Bruce Banner", "hulk", "Hulk...SMASH!", USER)
        self._create_user("Stephen Strange", "dr.strange", "1234567890", USER)
        self._create_user("Steve Rogers", "captain", "1234567890", USER)
        self._create_user("Tony Stark", "ironman", "1234567890", USER)

    @property
    def ip(self):
        return self._ip

    @ip.setter
    def ip(self, ip: str):
        isv4 = re.fullmatch(IPv4_matcher, ip, re.IGNORECASE)
        isv6 = re.fullmatch(IPv6_matcher, ip, re.IGNORECASE)
        if not isv4 and not isv6:
            raise ConnectionError('Can not connect to Server.')
        self._ip = ip

    def _create_user(self, name, login, password, right):
        user: User = User(name, login)
        user.password = password
        user.right = right
        self._add_user(user)

    def _add_user(self, user: User):
        self.user_ids[user.login] = user.user_id
        self.users[user.user_id] = user

    def _current_right(self, token):
        user = self.user_sessions.get(token, None)
        if not user or not user.active:
            raise PermissionError("Token not valid or account locked.")
        return user.right

    def _check_rights(self, token, requested_right = GUEST):
        if self._current_right(token) < requested_right:
            raise PermissionError("Not enough rights.")

    def _get_token(self, user):
        for t, u in self.user_sessions.items():
            if user is u:
                return t
        token = secrets.token_urlsafe(20)
        self.user_sessions[token] = user
        return token

    def _get_user_by_id(self, user_id):
        user = self.users.get(user_id, None)
        if not user:
            raise ValueError("User not found.")
        return user

    def _get_userid_by_login(self, login):
        user_id = self.user_ids.get(login, None)
        if not user_id:
            raise ValueError("User not found.")
        return user_id

    def get_version(self, token) -> str:
        self._check_rights(token)
        return '1.0.4'

    def logout(self, token):
        try:
            user = self.user_sessions.pop(token)
            print(f'User "{user.name}" succesfully logged out.')
        except KeyError:
            print('Given token was not valid.')

    def authenticate(self, login: str, password: str) -> str:
        id = self._get_userid_by_login(login)
        user = self.users[id]
        if not user.check_password(password):
            raise ValueError("Invalid Password")
        return self._get_token(user)

    def get_user_id(self, token, login = None) -> str:
        self._check_rights(token, GUEST)
        if login is None:
            return self.user_sessions[token].user_id
        self._check_rights(token, USER)
        user_id = self._get_userid_by_login(login)
        return user_id

    def get_user_name(self, token, user_id=None) -> str:
        self._check_rights(token, GUEST)
        if user_id is None:
            return self.user_sessions[token].name
        user = self._get_user_by_id(user_id)
        return user.name

    def get_user(self, token, user_id=None) -> Dict[str, str]:
        self._check_rights(token, GUEST)
        if user_id is None or user_id == self.user_sessions[token].user_id:
            return self.user_sessions[token].dump()
        self._check_rights(token, ADMIN)
        user = self._get_user_by_id(user_id)
        return user.dump()

    def get_user_all(self, token) -> List[Dict[str, str]]:
        self._check_rights(token, ADMIN)
        return [u.dump() for u in self.users.values()]

    def delete_user(self, token, userid):
        self._check_rights(token, GUEST)
        if userid == self.user_sessions[token].user_id:
            self.user_sessions[token].active = False
            self.user_sessions.pop(token)
        else:
            self._check_rights(token, ADMIN)

    def get_logout(self, token):
        self._check_rights(token, NONE)
        self.user_sessions.pop(token)

    def put_user_password(self, token, new_password, old_password=None, user_id=None):
        self._check_rights(token, GUEST)
        user = self.user_sessions[token]
        if user_id is None or user_id == user.user_id:
            if not user.check_password(old_password):
                raise ValueError("Invalid Original Password")
            user.password = new_password
        else:
            self._check_rights(token, ADMIN)
            selected_user = self._get_user_by_id(user_id)
            selected_user.password = new_password

    def put_user_name(self, token, name, user_id=None):
        self._check_rights(token, GUEST)
        if user_id is None or user_id == self.user_sessions[token].user_id:
            self.user_sessions[token].name = name
        else:
            self._check_rights(token, ADMIN)
            selected_user = self._get_user_by_id(user_id)
            selected_user.name = name

    def put_user_right(self, token, right, user_id):
        self._check_rights(token, ADMIN)
        selected_user = self._get_user_by_id(user_id)
        selected_user.right = (
            right if isinstance(right, UserRight) else UserRight[right]
        )

    def post_new_user(self, token, name, login) -> str:
        user = User(name, login)
        self._add_user(user)
        return user.user_id
