import { Project } from "@/domain/entities/Project";
import { store } from "@/infrastructure/store";
import {
  addToProjectList,
  getProjectsList,
  getSelectedProjectById,
  removeFromProjectList,
  setSelectedProject,
  updateProjectList,
} from "@/infrastructure/store/slices/projects/projectsSlices";
import { AuthState } from "@/infrastructure/store/slices/user/authSlice";

export const getProjects = (token: AuthState["token"]) => {
  store.dispatch(getProjectsList(token));
};
export const getProjectById = (
  selectedProjectId: Project["id"],
  token: AuthState["token"],
) => {
  store.dispatch(
    getSelectedProjectById({ projectId: selectedProjectId, token }),
  );
};
export const setSelectedProjectById = (selectedProject: Project) => {
  store.dispatch(setSelectedProject(selectedProject));
};
export const addProject = (newProject: Project,token:AuthState["token"]) => {
  store.dispatch(addToProjectList({newProject,token}));
};
export const updateProject = (updatedProject: Project, token: AuthState["token"]) => {
  store.dispatch(updateProjectList({ updatedProject, token }));
};
export const removeProject = (projectId: Project["id"], token: AuthState["token"]) => {
  store.dispatch(removeFromProjectList({projectId,token}));
};
