import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { DirectusUserRepository } from "../../../repositories/DirectusUserRepository";

interface AuthState {
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
  const response=await userRepository.loginUser(userCredentials);
  return response
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
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
