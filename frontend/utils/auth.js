import {setCookie,removeCookie, getCookie} from './cookies.js'
import {axiosInstance} from './api.js'

export const setAuthentication =(token)=>{
  if(token){
    setCookie('token',token)
  }
}
export const logOut = ()=>{
removeCookie('token')
}
export const isLoggedIn =async()=>{
  const token = getCookie('token')
  return !!token;
}