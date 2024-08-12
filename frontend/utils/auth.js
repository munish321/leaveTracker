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
  if(token){
    return await axiosInstance.post("/auth",{token:token}).then((res)=>{
      if(res.status===200){
        return res.data.auth
      }else{
        return res.data.auth;
      }
    })
  }else{
    return false
  }
}