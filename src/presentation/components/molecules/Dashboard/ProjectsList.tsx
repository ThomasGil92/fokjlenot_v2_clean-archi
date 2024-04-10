import { CardContent } from "@/presentation/shadcn/components/ui/card";
import ProjectsListItem from "../../atoms/Dashboard/ProjectsListItem";
import { Project, ProjectStatus } from "@/domain/entities/Project";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/presentation/shadcn/components/ui/dialog";
import { Button } from "@/presentation/shadcn/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { addProject } from "@/domain/usecases/projects/projectsUseCase";
import { useAppSelector } from "@/infrastructure/store";
import SubmitButton from "../../atoms/shared/SubmitButton";
import AddProjectFormFields from "./AddProjectFormFields";

interface ProjectListProp {
  projects: Project[];
}

const ProjectsList: React.FC<ProjectListProp> = ({ projects }) => {
  const token = useAppSelector((state) => state.auth.token);

  const formSchema = z.object({
    title: z
      .string()
      .min(1, { message: "You must provide a title for this project" }),
    id: z.string(),
    status: z.nativeEnum(ProjectStatus),
    owner: z.string(),
    collaborators: z.array(z.string()),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      id: "1",
      collaborators: ["1"],
      status: ProjectStatus.PENDING,
      owner: "1",
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    // e.preventDefault();

    addProject(values, token);

    form.reset();
  };

  return (
    <CardContent>
      <Dialog>
        <DialogTrigger asChild>
          <Button data-testid='addButton'>New project</Button>
        </DialogTrigger>
        <DialogContent data-testid='addProjectDialog'>
          <DialogHeader>
            <DialogTitle>Create a new Project</DialogTitle>
          </DialogHeader>
          <form
            data-testid='addProjectForm'
            onSubmit={form.handleSubmit(handleSubmit)}
            className=''
          >
            <AddProjectFormFields form={form} />
            <SubmitButton text='Save' testId="addProjectButton" />
          </form>
        </DialogContent>
      </Dialog>

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
