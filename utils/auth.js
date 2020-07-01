import cookie from 'js-cookie';
import Router from 'next/router'
export function handleLogin(token){
    //set token to cookie
    cookie.set('token',token);
    Router.push("/account");


}