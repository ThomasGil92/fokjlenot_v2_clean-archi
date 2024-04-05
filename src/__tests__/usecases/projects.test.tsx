import { worker } from "../msw/browser";
import { renderWithProviders } from "../test-utils";
import {
  addProject,
  getProjects,
  removeProject,
  updateProject,
} from "@/domain/usecases/projects/projectsUseCase";
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

    addProject({ ...newProject, id: "3", title: "Encore un autre projet" });
    await waitFor(() => expect(store.getState().projects.list).toHaveLength(3));
  });
  test("should update a project with id", async () => {
    const { store } = renderWithProviders();
    const updatedProject: Project = {
      id: "1",
      title: "Nouveau projet modifié",
      status: ProjectStatus.PROGRESS,
      owner: "1",
      collaborators: ["1"],
    };
    updateProject(updatedProject);
    await waitFor(() =>
      expect(store.getState().projects.list[0]).toStrictEqual({
        id: "1",
        title: "Nouveau projet modifié",
        status: ProjectStatus.PROGRESS,
        owner: "1",
        collaborators: ["1"],
      }),
    );
  });
  test("should remove a project with id", async () => {
    const { store } = renderWithProviders();
    let projectId = "1";
    expect(store.getState().projects.list).toHaveLength(3);
    removeProject(projectId);
    await waitFor(() => expect(store.getState().projects.list).toHaveLength(2));
    projectId = "3";
    removeProject(projectId);
    await waitFor(() => expect(store.getState().projects.list).toHaveLength(1));
  });
});
