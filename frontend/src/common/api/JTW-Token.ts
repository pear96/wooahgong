export const saveToken = (token: any) => {
  if(window.localStorage.getItem('token') !== null){
    console.log("????");
    window.localStorage.removeItem('token');
  }
  window.localStorage.setItem('token', token);
};
export const getToken = () => {
  return window.localStorage.getItem('token');
};
export const deleteToken = () => {
  console.log("????????지워짐?");
  window.localStorage.removeItem('token');
};
