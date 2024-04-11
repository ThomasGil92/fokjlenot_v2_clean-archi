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

describe("login: should connect when all login fields are completed and when the form is submited", () => {
  test("should get error if none of the fiels are filled", async () => {
    const { getByTestId, getByText } = renderWithProviders("/login");

    const email = getByTestId("emailInput");
    const password = getByTestId("passwordInput");
    const button = getByTestId("loginButton");
    fireEvent.change(email, { target: { value: "" } });
    fireEvent.change(password, { target: { value: "" } });
    fireEvent.click(button);
    await waitFor(() => {
      expect(getByText("This field has to be filled.")).toBeInTheDocument();
      expect(
        getByText("Your password should have 4 character min"),
      ).toBeInTheDocument();
    });
  });
  test("should save access_token in the store", async () => {
    const { getByTestId, store, router } = renderWithProviders("/login");
    TokenRepositoryLocalStorage.setToken("token.1234");
    const email = getByTestId("emailInput");
    const password = getByTestId("passwordInput");
    const button = getByTestId("loginButton");

    fireEvent.change(email, { target: { value: "fakeemail@gmail.com" } });
    fireEvent.change(password, { target: { value: "pass1234" } });
    expect(email).toHaveValue("fakeemail@gmail.com");

    fireEvent.click(button);

    await waitFor(() => {
      expect(store.getState().auth.token).not.toBeNull();
      expect(router.state.location.pathname).toBe("/dashboard");
    });
  });
  
});

