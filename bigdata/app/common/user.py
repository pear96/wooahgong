from fastapi import HTTPException, status
from jose import jwt, JWTError
from app.common.config import Config
from app.database.schema import User

SECRET_KEY = Config.JWT_SECRET
ALGORITHM = Config.JWT_ALGORITHM
PREFIX = "Bearer "

# 사용자 찾기
def find_user(request, session):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    token = request.headers.get('Authorization')
    # Authorization으로 받은 내용을 JWT로 해석하여서 email을 추출해냄
    try:
        token = token.replace(PREFIX, "")
        user_email = jwt.decode(token, SECRET_KEY, [ALGORITHM])["sub"] # {'sub': 'amlwq@naver.com', 'iss': 'ssafy.com', 'exp': 1649907298, 'iat': 1648611298} 
    except JWTError:
        raise credentials_exception
    # 해당 email로 user를 찾음
    user = session.query(User).filter(User.email == user_email).one()
    return user