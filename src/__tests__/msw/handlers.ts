
import { usersHandlers } from "./handlers/user";
import { projectsHandlers } from "./handlers/projectsHandlers";

export const handlers = [
  //Intercept requests
  ...usersHandlers,
  ...projectsHandlers
];
