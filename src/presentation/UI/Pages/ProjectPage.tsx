
import { useAppSelector } from "@/infrastructure/store";
import { getProjectById } from "@/domain/usecases/projects/projectsUseCase";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const ProjectPage = () => {
   const project = useAppSelector((state) => state.projects.selected);
  
  //  const test=useLoaderData() as string
   const params = useParams();

  

  useEffect(() => {
    getProjectById(params.id);
  }, []);

  
  return <p>hello</p>;
};

export default ProjectPage;
