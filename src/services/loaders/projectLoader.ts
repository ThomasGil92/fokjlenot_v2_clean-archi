import { setSelectedProjectById } from "@/domain/usecases/projects/projectsUseCase";
import axiosInstance from "@/infrastructure/api/axiosInstance";
import { ActionFunctionArgs, ParamParseKey, Params } from "react-router-dom";

const PathNames = {
  projectDetail: "/project/:id",
} as const;

interface Args extends ActionFunctionArgs {
  params: Params<ParamParseKey<typeof PathNames.projectDetail>>;
}

export const getProjectById = async ({ params }: Args) => {
  try {
    const response = await axiosInstance.get(`/items/project/${params.id}`);
    
    setSelectedProjectById(response.data.data.project);
    return response;
  } catch (error) {
    throw new Error("impossible de récupérer le projet") as Error
  }
};
