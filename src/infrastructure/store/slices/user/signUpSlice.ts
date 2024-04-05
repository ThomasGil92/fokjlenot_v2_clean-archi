import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { DirectusUserRepository } from "../../../repositories/DirectusUserRepository";
import { UserCredentials } from "../../../../domain/entities/User";

interface SignUpState {
  loading: boolean;
  // Autres champs d'état liés à l'authentification
}



const initialState: SignUpState = {
  loading: false,
  // Initialiser d'autres champs d'état liés à l'authentification si nécessaire
};

export const createUser = createAsyncThunk<
  unknown,
  UserCredentials
>("user/createUser", async (userCredentials: UserCredentials) => {
  const userRepository = new DirectusUserRepository();
  return await userRepository.createUser(userCredentials);
});

const signUpSlice = createSlice({
  name: "signUp",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(createUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createUser.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default signUpSlice.reducer;
