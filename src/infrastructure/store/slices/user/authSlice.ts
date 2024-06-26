import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { DirectusUserRepository } from "../../../repositories/DirectusUserRepository";

export interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  loading: boolean;
  // Autres champs d'état liés à l'authentification
}

interface UserCredentials {
  email: string;
  password: string;
}

const initialState: AuthState = {
  isAuthenticated: false,
  token: null,
  loading: false,
  // Initialiser d'autres champs d'état liés à l'authentification si nécessaire
};

export const loginUser = createAsyncThunk<
  { access_token: string; refresh_token: string },
  UserCredentials
>("user/loginUser", async (userCredentials: UserCredentials) => {
  const userRepository = new DirectusUserRepository();
  const response = await userRepository.loginUser(userCredentials);
  return response;
});

export const logOutUser=createAction("user/logOutUser")
export const setTokenInStore = createAction<AuthState["token"]>("user/setTokenInStore");

const authSlice = createSlice({
  name: "auth",
  initialState: initialState satisfies AuthState as AuthState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(setTokenInStore, (state,action) => {
        state.token = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(logOutUser, (state) => {
        state.token = null;
        state.isAuthenticated = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.token = action.payload.access_token;
      })
      .addCase(loginUser.rejected, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
      });
  },
});

export default authSlice.reducer;
