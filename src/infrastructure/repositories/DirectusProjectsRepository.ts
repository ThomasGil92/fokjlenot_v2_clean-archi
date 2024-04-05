import axiosInstance from "../api/axiosInstance";
import { Project } from "@/domain/entities/Project";

// Interface représentant un référentiel pour gérer les utilisateurs
export interface IProjectsRepository {
  // Méthode pour créer un nouvel utilisateur
  getProjectsList(): Promise<Project[]>;
}

export class DirectusProjectsRepository implements IProjectsRepository {
  async getProjectsList() {
    try {
      const response = await axiosInstance.get(`/items/projects`);
      //return new User(response.data) ???

      const returnedDatas = response.data.data.projects_list;
      return returnedDatas;
    } catch (error) {
      // En cas d'erreur, rejetez avec le message d'erreur
      throw new Error("cannot find projects") as Error;
    }
  }
  async addToProjectsList(newProject: Project) {
    try {
      const response = await axiosInstance.post(`/items/projects`, newProject);
      //return new User(response.data) ???

      const returnedDatas: Project = response.data.data.new_project;
      return returnedDatas;
    } catch (error) {
      throw new Error("cannot add to projects list") as Error;
    }
  }
}