export const saveToken = (token: any) => {
  window.localStorage.setItem('token', token);
};
export const getToken = () => {
  return window.localStorage.getItem('token');
};
export const deleteToken = () => {
  window.localStorage.removeItem('token');
};
