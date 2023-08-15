import base64
import mimetypes
from app.common.config import Config


IMG_DIR = Config.IMG_DIR


def get_image(image_path):
    image_path = IMG_DIR + image_path
    # MIME 타입 추론
    mime_type, _ = mimetypes.guess_type(image_path)

    # 이미지 파일 읽기
    with open(image_path, "rb") as image_file:
        encoded_string = base64.b64encode(image_file.read()).decode('utf-8')
    
    # Data URI 형식으로 반환
    return f"data:{mime_type};base64,{encoded_string}"