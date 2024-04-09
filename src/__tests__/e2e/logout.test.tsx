import { worker } from "@/__tests__/msw/server";
import { renderWithProviders } from "../test-utils";
import "@testing-library/jest-dom";
import { fireEvent, waitFor } from "@testing-library/dom";
import { TokenRepositoryLocalStorage } from "@/infrastructure/auth/TokenRepositoryLocalStorage";

// Enable API mocking before tests.
beforeAll(() => worker.listen());

// Reset any runtime request handlers we may add during the tests.
afterEach(() => worker.resetHandlers());

// Disable API mocking after the tests are done.
afterAll(() => worker.close());

describe("logout: should remove the token from localStorage and from redux", () => {
  test("should remove the authToken from localStorage and from redux", async () => {
    const { getByTestId, store, router } = renderWithProviders("/login");
    TokenRepositoryLocalStorage.setToken("token1234");
    const email = getByTestId("email");
    const password = getByTestId("password");
    const button = getByTestId("loginButton");

    fireEvent.change(email, { target: { value: "fakeemail@gmail.com" } });
    fireEvent.change(password, { target: { value: "pass1234" } });
    fireEvent.click(button);
    await waitFor(() => {
      expect(store.getState().auth.token).toBe("token.1234");
    });
    const logoutButton = getByTestId("logoutButton");
    expect(logoutButton).toBeInTheDocument();
    fireEvent.click(logoutButton);

    expect(store.getState().auth.token).toBeNull();
    expect (localStorage.getItem("authToken")).toBeNull()
    expect(router.state.location.pathname).toBe("/");
  });
});
