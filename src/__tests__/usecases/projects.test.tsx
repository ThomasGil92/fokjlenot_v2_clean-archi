import { setupStore } from "@/infrastructure/store";
import { worker } from "../msw/browser";
import { renderWithProviders } from "../test-utils";
import { addProject, getProjects } from "@/domain/usecases/projects/projectsUseCase";
import { waitFor } from "@testing-library/dom";
import { Project, ProjectStatus } from "@/domain/entities/Project";

// Enable API mocking before tests.
beforeAll(() => worker.listen());

// Reset any runtime request handlers we may add during the tests.
afterEach(() => worker.resetHandlers());

// Disable API mocking after the tests are done.
afterAll(() => worker.close());

describe("projects usecases", () => {
  test("should fetch projects list and get it in the state", async () => {
    const { store } = renderWithProviders();

    getProjects();

    await waitFor(() => expect(store.getState().projects.list).not.toBeNull());
  });
  test("should add a project and get it in the state", async () => {
    const { store } = renderWithProviders();
    const newProject: Project = {
      id: "2",
      title: "Nouveau projet",
      status: ProjectStatus.PENDING,
      owner: "1",
      collaborators: ["1"],
    };
    addProject(newProject);
    await waitFor(() => expect(store.getState().projects.list).toHaveLength(2));
  });
});
