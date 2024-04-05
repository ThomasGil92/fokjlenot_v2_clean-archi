import { User } from "./User";

export enum ProjectStatus {
  PENDING = "pending",
  DONE = "done",
  PROGRESS = "progress",
}

export type UserId = User["id"];

export type Project = {
  id: string;
  title: string;
  status: ProjectStatus;
  owner: UserId;
  collaborators: UserId[] | [];
};
