import { User as UserInterface } from "../entities/User";

export class User implements UserInterface {
  id: string;
  username: string;
  email: string;
  password?: string;

  constructor(id: string, username: string, email: string, password: string) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password;
  }
}
