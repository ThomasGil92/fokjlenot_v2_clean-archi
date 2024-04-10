import { HttpResponse, http } from "msw";

export const usersHandlers = [
  http.post(`/auth/users`, async (req) => {
    try {
      const users: { email: string; password: string }[] = [];
      const user = (await req.request.json()) as {
        email: string;
        password: string;
      };

      users.push({ email: user.email, password: user.password });
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
];