import {  setupServer } from "msw/node";
//import {setupWorker} from "msw/browser"
import { handlers } from "./handlers";

 export const worker = setupServer(...handlers);
