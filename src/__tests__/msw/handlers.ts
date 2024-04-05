import { Project, ProjectStatus } from "@/domain/entities/Project";
import { http, HttpResponse } from "msw";
export let projects_list: Project[] = [
  {
    id: "1",
    title: "Premier projet",
    status: ProjectStatus.PENDING,
    owner: "1",
    collaborators: ["1"],
  },
];
export const handlers = [
  //Intercept requests
  http.post(`/auth/users`, async (req) => {
    try {
      const users: { email: string }[] = [];
      const data = (await req.request.json()) as {
        email: string;
        password: string;
      };

      users.push({ email: data.email });
      // console.log(await req.request.body);
      return HttpResponse.json(users);
    } catch (error) {
      console.log(error);
    }
  }),
  http.post(`/auth/login`, async () => {
    try {
      return HttpResponse.json(
        {
          data: {
            access_token: "token.1234",
            createdAt: new Date().toLocaleString,
          },
        },

        { status: 201 },
      );
    } catch (error) {
      console.log("login error");
      return HttpResponse.json(
        {
          error,
        },
        { status: 500 },
      );
    }
    //if no token
    // const authToken=request.headers.get("Authorization")
    // if(!authToken)return HttpResponse.json({msg:"Unauthorized"},{status:401})
    // const requestBody = await request.json();
  }),
  http.get("/items/projects", async () => {
    const projects_list: Project[] = [
      {
        id: "1",
        title: "Première tâche",
        status: ProjectStatus.PENDING,
        owner: "1",
        collaborators: ["1"],
      },
    ];
    try {
      return HttpResponse.json(
        {
          data: {
            projects_list,
            createdAt: new Date().toLocaleString,
          },
        },

        { status: 201 },
      );
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
  http.post("/items/projects", async (req) => {
    try {
      const data = (await req.request.json()) as Project;
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
  http.patch("/items/projects/:id", async (req) => {
    const { id } = req.params;
    try {
      const data = (await req.request.json()) as Project;
      const updatedList = projects_list.map((project) =>
        project.id === id ? data : project,
      );
      projects_list = [...updatedList];
      return HttpResponse.json(
        {
          data: {
            updated_project: data,
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
  http.delete("/items/projects/:id", async (req) => {
    const { id } = req.params;
    try {
     const updatedList = projects_list.filter((project) =>
        project.id !== id 
      );
      projects_list = [...updatedList];
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
