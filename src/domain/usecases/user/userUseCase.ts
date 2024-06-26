import { TokenRepositoryLocalStorage } from "@/infrastructure/auth/TokenRepositoryLocalStorage";
import { store } from "@/infrastructure/store";
import {
  AuthState,
  loginUser,
  logOutUser,
  setTokenInStore,
} from "@/infrastructure/store/slices/user/authSlice";
import { createUser } from "@/infrastructure/store/slices/user/signUpSlice";

interface UserCredentials {
  email: string;
  password: string;
}

export const login = async (
  userCredentials: UserCredentials,
): Promise<void> => {
  await store.dispatch(loginUser(userCredentials));
};
export const signUp = async (
  userCredentials: UserCredentials,
): Promise<void> => {
  await store.dispatch(createUser(userCredentials));
};
export const logOut = (): void => {
  store.dispatch(logOutUser());
  TokenRepositoryLocalStorage.removeToken();
};
export const setTokenToStore = (token: AuthState["token"]) => {
  store.dispatch(setTokenInStore(token));
};
