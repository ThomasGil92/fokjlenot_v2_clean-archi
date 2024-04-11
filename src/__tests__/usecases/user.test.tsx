import { setupStore } from "@/infrastructure/store";
import { worker } from "../msw/server";
import { act, waitFor } from "@testing-library/react";
import { logOut, login, signUp } from "@/domain/usecases/user/userUseCase";
import { renderWithProviders } from "../test-utils";

// Enable API mocking before tests.
beforeAll(() => worker.listen());

// Reset any runtime request handlers we may add during the tests.
afterEach(() => worker.resetHandlers());

// Disable API mocking after the tests are done.
afterAll(() => worker.close());

describe("user useCase", () => {
  test("should get token with loginUser useCase", async () => {
    const { store } = renderWithProviders("/");

    login({
      email: "fakeemail@gmail.com",
      password: "fakepassword",
    }),
      await waitFor(() =>
        expect(store.getState().auth.token).toBe("token.1234"),
      );
  });
  test("should logout a user", async () => {
    localStorage.setItem("authToken", "token.1234");
    const { store } = renderWithProviders("/dashboard");
     act(()=>logOut());
    await waitFor(() => {
      expect(store.getState().auth.token).toBeNull();
      expect(store.getState().auth.isAuthenticated).toBeFalsy();
    });
  });
  test("should add user with createUser useCase", async () => {
    const store = setupStore();

    signUp({
      email: "fakeemail@gmail.com",
      password: "fakepassword",
    });
    await waitFor(() => expect(store.getState().auth.token).toBeNull());
    await waitFor(() => expect(store.getState().auth.loading).toBeFalsy());
  });
});
