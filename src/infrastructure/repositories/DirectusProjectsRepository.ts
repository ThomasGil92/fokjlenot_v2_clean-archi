import axiosInstance from "../api/axiosInstance";
import { Project } from "@/domain/entities/Project";
import { AuthState } from "../store/slices/user/authSlice";

// Interface représentant un référentiel pour gérer les utilisateurs
export interface IProjectsRepository {
  // Méthode pour créer un nouvel utilisateur
  getProjectsList(token: AuthState["token"]): Promise<Project[]>;
  getProjectById(
    projectId: Project["id"],
    token: AuthState["token"],
  ): Promise<Project>;
}

const authHeaders = (token: AuthState["token"]) => {
  return {
    headers: { Authorization: `Bearer${token}` },
  };
};

export class DirectusProjectsRepository implements IProjectsRepository {
  //Get all projects from a user with token
  async getProjectsList(token: AuthState["token"]) {
    try {
      const response = await axiosInstance.get(
        `/items/projects`,
        authHeaders(token),
      );
      //return new User(response.data) ???

      const returnedDatas = response.data.data.projects_list;
      return returnedDatas;
    } catch (error) {
      // En cas d'erreur, rejetez avec le message d'erreur
      throw new Error("cannot find projects") as Error;
    }
  }
  async getProjectById(projectId: Project["id"], token: AuthState["token"]) {
    try {
      const response = await axiosInstance.get(
        `/items/project/${projectId}`,
        authHeaders(token),
      );
      //return new User(response.data) ???

      const returnedDatas = response.data.data.project;
      return returnedDatas;
    } catch (error) {
      throw new Error("cannot find projects") as Error;
    }
  }
  async addToProjectsList(newProject: Project, token: AuthState["token"]) {
    try {
      const response = await axiosInstance.post(
        `/items/projects`,
        newProject,
        authHeaders(token),
      );
      //return new User(response.data) ???

      const returnedDatas: Project = response.data.data.new_project;
      return returnedDatas;
    } catch (error) {
      throw new Error("cannot add to projects list") as Error;
    }
  }
  async updateProjectList(updatedProject: Project, token: AuthState["token"]) {
    try {
      const response = await axiosInstance.patch(
        `/items/projects/${updatedProject.id}`,
        updatedProject,
        authHeaders(token),
      );
      //return new User(response.data) ???

      const returnedDatas: Project = response.data.data.updated_project;
      return returnedDatas;
    } catch (error) {
      throw new Error("cannot update the project") as Error;
    }
  }
  async removeFromProjectList(
    projectId: Project["id"],
    token: AuthState["token"],
  ) {
    try {
      const response = await axiosInstance.delete(
        `/items/projects/${projectId}`,authHeaders(token)
      );
      //return new User(response.data) ???

      const returnedDatas: string = response.data.data.removed_project_id;
      return returnedDatas;
    } catch (error) {
      throw new Error("cannot update the project") as Error;
    }
  }
}
