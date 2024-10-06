import Cookies from "js-cookie";
const tokenName =process.env.VUE_APP_tokenName
const Token_key=tokenName

export function SetCookie(value){
    Cookies.set(Token_key,value)
}

export function GetCookie(){
    return Cookies.get(Token_key)
}

export function RemoveCookie(){
    Cookies.remove(Token_key)
}