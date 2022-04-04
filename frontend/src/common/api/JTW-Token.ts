export const saveToken = (token: any) => {
  if (window.localStorage.getItem('token') !== null) {
    window.localStorage.removeItem('token');
  }
  window.localStorage.setItem('token', token);
};
export const getToken = () => {
  return window.localStorage.getItem('token');
};
export const deleteToken = () => {
  console.log("????실행");
  window.localStorage.clear();
  console.log(window.localStorage)
};
