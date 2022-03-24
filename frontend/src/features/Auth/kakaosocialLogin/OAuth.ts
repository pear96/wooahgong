const CLIENT_ID = '39354a65901f2a0ae180f57749a754ac';
const REDIRECT_URI = 'http://localhost:3000/oauth/callback/kakao';

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
