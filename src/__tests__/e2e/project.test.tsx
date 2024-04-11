import { worker } from "@/__tests__/msw/server";
import { renderWithProviders } from "../test-utils";
import "@testing-library/jest-dom";
import { fireEvent, waitFor } from "@testing-library/dom";

const FAKE_TOKEN: string = "token.1234";

// Enable API mocking before tests.
beforeAll(() => {
  worker.listen();
  localStorage.setItem("authToken", FAKE_TOKEN);
});

// Reset any runtime request handlers we may add during the tests.
afterEach(() => worker.resetHandlers());

// Disable API mocking after the tests are done.
afterAll(() => worker.close());

describe("project: should be possible to add a project", () => {
  test("add a project from dashboard", async () => {
    const { getByTestId, store } = renderWithProviders("/dashboard");
    await waitFor(() => {
      const addButton = getByTestId("addButton");
      expect(store.getState().projects.list).toHaveLength(2);
      expect(addButton).toBeInTheDocument();
      fireEvent.click(addButton);
      const dialog = getByTestId("addProjectDialog");
      expect(dialog).toBeInTheDocument();
      expect(dialog).toHaveAttribute("data-state", "open");
    });
    const titleInput = getByTestId("titleInput");
    fireEvent.change(titleInput, { target: { value: "Troisème projet" } });
    fireEvent.click(getByTestId("addProjectButton"));
    expect(getByTestId("addProjectButton")).toBeInTheDocument();
    console.log(store.getState().projects);
    await waitFor(() => {
      expect(store.getState().projects.list).toHaveLength(3);
    });
  });
});
describe("project charts", () => {
  test("should render a chart of project status", async() => {
    const {getByTestId}=renderWithProviders("/dashboard") 
    window.HTMLCanvasElement.prototype.getContext = () => {}
await waitFor(()=>{
  const projectStatusChart=getByTestId("projectStatusChart")
  expect(projectStatusChart).toBeInTheDocument()
})
  });
});
