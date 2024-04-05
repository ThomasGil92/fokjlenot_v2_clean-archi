import { Project } from "@/domain/entities/Project";
import { store } from "@/infrastructure/store";
import {
  addToProjectList,
  getProjectsList,
} from "@/infrastructure/store/slices/projects/projectsSlices";

export const getProjects = () => {
  store.dispatch(getProjectsList());
};
export const addProject = (newProject: Project) => {
  store.dispatch(addToProjectList(newProject));
};
