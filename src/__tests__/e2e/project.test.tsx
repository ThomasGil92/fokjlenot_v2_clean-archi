import { worker } from "@/__tests__/msw/server";
import { renderWithProviders } from "../test-utils";
import "@testing-library/jest-dom";
import { fireEvent, waitFor } from "@testing-library/dom";
// Enable API mocking before tests.
beforeAll(() => worker.listen());

// Reset any runtime request handlers we may add during the tests.
afterEach(() => worker.resetHandlers());

// Disable API mocking after the tests are done.
afterAll(() => worker.close());

describe("project: should be possible to add a project", () => {
  test("add a project from dashboard", async () => {
    localStorage.setItem("authToken", "token1234");
    const { getByTestId } = renderWithProviders("/dashboard");
    await waitFor(async () => {
      const addButton = getByTestId("addButton");

      expect(addButton).toBeInTheDocument();
      fireEvent.click(addButton);
      const dialog = getByTestId("addProjectDialog");
      expect(dialog).toBeInTheDocument();
      expect(dialog).toHaveAttribute("data-state", "open");
    });
  });
});
