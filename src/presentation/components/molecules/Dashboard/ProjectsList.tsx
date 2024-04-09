import { CardContent } from "@/presentation/shadcn/components/ui/card";
import ProjectsListItem from "../../atoms/Dashboard/ProjectsListItem";
import { Project } from "@/domain/entities/Project";

interface ProjectListProp {
  projects: Project[];
}

const ProjectsList: React.FC<ProjectListProp> = ({ projects }) => {
  return (
    <CardContent>
      {projects.map((project) => (
        <div
          key={project.id + project.title + "ProjectListItem"}
          className='group flex flex-col gap-4 py-2'
        >
          <ProjectsListItem {...project} />
        </div>
      ))}
    </CardContent>
  );
};
export default ProjectsList;
