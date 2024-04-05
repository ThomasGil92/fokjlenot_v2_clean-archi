
import {store} from "@/infrastructure/store";
import { loginUser } from "@/infrastructure/store/slices/user/authSlice";
import { createUser } from "@/infrastructure/store/slices/user/signUpSlice";


interface UserCredentials {
  email: string;
  password: string;
}

export const login=(userCredentials:UserCredentials):void=>{
    store.dispatch(loginUser(userCredentials))
}
export const signUp=(userCredentials:UserCredentials):void=>{
    store.dispatch(createUser(userCredentials))
}


