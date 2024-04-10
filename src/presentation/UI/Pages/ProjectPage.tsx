import { useAppSelector } from "@/infrastructure/store";
import { getProjectById } from "@/domain/usecases/projects/projectsUseCase";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import ProjectCard from "@/presentation/components/organisms/Project/ProjectCard";

const ProjectPage = () => {
  const project = useAppSelector((state) => state.projects.selected);
  const token = useAppSelector((state) => state.auth.token);

  //  const test=useLoaderData() as string
  const params = useParams();

  useEffect(() => {
    getProjectById(params.id!, token);
  }, []);

  return (
    project && (
      <div className='container'>
        <h1 className="text-4xl font-bold font-mono">{project.title}</h1>
        <ProjectCard/>
      </div>
    )
  );
};

export default ProjectPage;
