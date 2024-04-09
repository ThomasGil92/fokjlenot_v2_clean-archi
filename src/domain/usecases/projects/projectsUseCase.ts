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

export const getProjects = () => {
  store.dispatch(getProjectsList());
};
export const getProjectById = (selectedProjectId:Project["id"]) => {
  store.dispatch(getSelectedProjectById(selectedProjectId));
};
export const setSelectedProjectById = (selectedProject: Project) => {
  store.dispatch(setSelectedProject(selectedProject));
};
export const addProject = (newProject: Project) => {
  store.dispatch(addToProjectList(newProject));
};
export const updateProject=(updatedProject:Project)=>{
store.dispatch(updateProjectList(updatedProject))
}
export const removeProject=(projectId:Project["id"])=>{
store.dispatch(removeFromProjectList(projectId));
}
