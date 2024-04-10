import { Card } from "@/presentation/shadcn/components/ui/card";
import ProjectsListCardHeader from "../../atoms/Dashboard/ProjectsListCardHeader";
import ProjectsList from "../../molecules/Dashboard/ProjectsList";
import { useEffect } from "react";
import { getProjects } from "@/domain/usecases/projects/projectsUseCase";
import { useAppSelector } from "@/infrastructure/store";

const ProjectsMenu = () => {
  const { list: projects, loading } = useAppSelector((state) => state.projects);
const token=useAppSelector(state=>state.auth.token)
  useEffect(() => {
    getProjects(token);
  }, []);

  return (
    <>
      <Card className='col-span-2 border rounded-lg '>
        <ProjectsListCardHeader />
        {loading ? <p>Loading</p> : <ProjectsList projects={projects} />}
      </Card>
    </>
  );
};
export default ProjectsMenu;
