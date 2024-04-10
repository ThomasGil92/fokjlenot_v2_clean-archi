import { Project, ProjectStatus } from "@/domain/entities/Project";
import { HttpResponse, PathParams, http } from "msw";
import { HttpRequestResolverExtras } from "msw/lib/core/handlers/HttpHandler";
import {
  DefaultBodyType,
  ResponseResolverInfo,
} from "msw/lib/core/handlers/RequestHandler";

export let projects_list: Project[] = [
  {
    id: "1",
    title: "Premier projet",
    status: ProjectStatus.PENDING,
    owner: "1",
    collaborators: ["1"],
  },
  {
    id: "2",
    title: "Deuxième projet",
    status: ProjectStatus.PENDING,
    owner: "1",
    collaborators: ["1"],
  },
];

const token = (
  req: ResponseResolverInfo<
    HttpRequestResolverExtras<PathParams>,
    DefaultBodyType
  >,
) => {
  return req.request.headers.get("Authorization")==="Bearertoken.1234" 
};

export const projectsHandlers = [
  //Get all projects by user and token
  http.get("/items/projects", async (req) => {
    const projectsByOwner = projects_list.filter(
      (project) => project.owner === "1",
    );
    try {
      if (token(req)) {
        return HttpResponse.json(
          {
            data: {
              projects_list: projectsByOwner,
              createdAt: new Date().toLocaleString,
            },
          },

          { status: 201 },
        );
      }
    } catch (error) {
      console.log("cannot find projects");
      return HttpResponse.json(
        {
          error,
        },
        { status: 500 },
      );
    }
  }),
  //Get a project by id and token
  http.get("/items/project/:id", async (req) => {
    const { id } = req.params;
    const project = projects_list.find((project) => project.id == id);
    
    try {
      if (token(req))
        return HttpResponse.json(
          {
            data: {
              project,
              createdAt: new Date().toLocaleString,
            },
          },

          { status: 201 },
        );
    } catch (error) {
      console.log("cannot find project");
      return HttpResponse.json(
        {
          error,
        },
        { status: 500 },
      );
    }
  }),
  // Add a project
  http.post("/items/projects", async (req) => {
    try {
      const data = (await req.request.json()) as Project;
      if (token(req))
        return HttpResponse.json(
          {
            data: {
              new_project: data,
            },
          },

          { status: 201 },
        );
    } catch (error) {
      console.log("cannot add project");
      return HttpResponse.json(
        {
          error,
        },
        { status: 500 },
      );
    }
  }),
  // Update a project
  http.patch("/items/projects/:id", async (req) => {
    const { id } = req.params;
    try {
      const data = (await req.request.json()) as Project;
      const updatedList = projects_list.map((project) =>
        project.id === id ? data : project,
      );
      projects_list = [...updatedList];
      if (token(req))
        return HttpResponse.json(
          {
            data: {
              updated_project: data,
            },
          },

          { status: 201 },
        );
    } catch (error) {
      console.log("cannot get project");
      return HttpResponse.json(
        {
          error,
        },
        { status: 500 },
      );
    }
  }),
  // Delete a project
  http.delete("/items/projects/:id", async (req) => {
    const { id } = req.params;
    try {
      const updatedList = projects_list.filter((project) => project.id !== id);
      projects_list = [...updatedList];
      if (token(req))
        return HttpResponse.json(
          {
            data: {
              removed_project_id: id,
            },
          },

          { status: 201 },
        );
    } catch (error) {
      console.log("cannot add project");
      return HttpResponse.json(
        {
          error,
        },
        { status: 500 },
      );
    }
  }),
];
