import { setupStore } from "@/infrastructure/store";
import { worker } from "../msw/browser";
import { waitFor } from "@testing-library/react";
import { login, signUp } from "@/domain/usecases/user/userUseCase";
import { renderWithProviders } from "../test-utils";

// Enable API mocking before tests.
beforeAll(() => worker.listen());

// Reset any runtime request handlers we may add during the tests.
afterEach(() => worker.resetHandlers());

// Disable API mocking after the tests are done.
afterAll(() => worker.close());

describe("user useCase", () => {
  test("should get token with loginUser useCase", async () => {
    

    const {store}=renderWithProviders("/")

    
      login({
        email: "fakeemail@gmail.com",
        password: "fakepassword",
      }),
   

    await waitFor(() => expect(store.getState().auth.token).toBe("token.1234"));
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
