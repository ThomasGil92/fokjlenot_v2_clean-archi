import { setTokenToStore } from "@/domain/usecases/user/userUseCase";
import { TokenRepositoryLocalStorage } from "@/infrastructure/auth/TokenRepositoryLocalStorage"
import { Navigate } from "react-router-dom";

export const tokenToStoreLoader=async()=>{
   const token= TokenRepositoryLocalStorage.getToken()
   if(token){
    setTokenToStore(token);
   return true;}
   return <Navigate to="/" replace/>

}