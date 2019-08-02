import JWT from "jsonwebtoken";

export function saveToken(token){
    localStorage.setItem("hygieatoken", token);
}
export function getToken(){
    return localStorage.getItem("hygieatoken");
}
export function getTokenDetails(){
   return JWT.decode(getToken());
}
