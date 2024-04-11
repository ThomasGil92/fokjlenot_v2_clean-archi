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

export const getProjects = async (token: AuthState["token"]):Promise<void> => {
  
  await store.dispatch(getProjectsList(token));
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
export const addProject = async(newProject: Project,token:AuthState["token"]):Promise<void> => {
  await store.dispatch(addToProjectList({newProject,token}));
};
export const updateProject = (updatedProject: Project, token: AuthState["token"]) => {
  store.dispatch(updateProjectList({ updatedProject, token }));
};
export const removeProject = (projectId: Project["id"], token: AuthState["token"]) => {
  store.dispatch(removeFromProjectList({projectId,token}));
};
