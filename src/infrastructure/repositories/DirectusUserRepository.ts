import { UserCredentials } from "@/domain/entities/User";
import { User } from "../../domain/models/User";
import axiosInstance from "../api/axiosInstance";
import { TokenRepositoryLocalStorage } from "../auth/TokenRepositoryLocalStorage";

// Interface représentant un référentiel pour gérer les utilisateurs
export interface IUserRepository {
  // Méthode pour créer un nouvel utilisateur
  createUser(user: UserCredentials): Promise<User>;

  loginUser(userCredentials: UserCredentials): Promise<User>;

  // Méthode pour obtenir un utilisateur par son ID
  getUserById(userId: string): Promise<User | null>;

  // Méthode pour obtenir un utilisateur par son adresse e-mail
  getUserByEmail(email: string): Promise<User | null>;

  // Méthode pour mettre à jour les informations d'un utilisateur
  updateUser(user: User): Promise<User>;

  // Méthode pour supprimer un utilisateur
  deleteUser(userId: string): Promise<void>;
}

export class DirectusUserRepository implements IUserRepository {
  async loginUser(userCredentials: UserCredentials) {
    try {
      const response = await axiosInstance.post(`/auth/login`, userCredentials);
      //return new User(response.data) ???

      const returnedDatas = response.data.data;
      
      TokenRepositoryLocalStorage.setToken(returnedDatas.access_token)
      return returnedDatas;
    } catch (error) {
      // En cas d'erreur, rejetez avec le message d'erreur
      throw new Error("inccorect credentials") as Error;
    }
  }

  async getUserByEmail(email: string): Promise<User | null> {
    try {
      const response = await axiosInstance.get("/users", {
        params: {
          filter: {
            email: {
              _eq: email,
            },
          },
        },
      });

      if (response.data.length > 0) {
        const userData = response.data[0];
        return new User(userData.id, userData.username, userData.email, "");
      } else {
        return null;
      }
    } catch (error) {
      console.error(
        "Erreur lors de la récupération de l'utilisateur par email:",
        error,
      );
      throw new Error(
        "Erreur lors de la récupération de l'utilisateur par email.",
      );
    }
  }

  async createUser(user: UserCredentials): Promise<User> {
    try {
      const response = await axiosInstance.post("/auth/users", {
        email: user.email,
        password: user.password,
      });

      const returnedDatas = response.data.data;

      return returnedDatas;
    } catch (error) {
      throw new Error("Erreur lors de la création de l'utilisateur.");
    }
  }

  async updateUser(user: User): Promise<User> {
    try {
      const response = await axiosInstance.put(`/users/${user.id}`, {
        email: user.email,
        password: user.password,
        username: user.username,
      });

      return new User(response.data.data.id, user.username, user.email, "");
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'utilisateur:", error);
      throw new Error("Erreur lors de la mise à jour de l'utilisateur.");
    }
  }

  async deleteUser(id: string): Promise<void> {
    try {
      await axiosInstance.delete(`/users/${id}`);
    } catch (error) {
      console.error("Erreur lors de la suppression de l'utilisateur:", error);
      throw new Error("Erreur lors de la suppression de l'utilisateur.");
    }
  }

  async getUserById(id: string): Promise<User | null> {
    try {
      const response = await axiosInstance.get(`/users/${id}`);

      if (response.data) {
        const userData = response.data;
        return new User(userData.id, userData.username, userData.email, "");
      } else {
        return null;
      }
    } catch (error) {
      console.error(
        "Erreur lors de la récupération de l'utilisateur par ID:",
        error,
      );
      throw new Error(
        "Erreur lors de la récupération de l'utilisateur par ID.",
      );
    }
  }
}
