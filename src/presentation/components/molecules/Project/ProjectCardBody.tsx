import { useAppSelector } from "@/infrastructure/store";
import { CardContent } from "@/presentation/shadcn/components/ui/card";

const ProjectCardBody = () => {
  const project = useAppSelector((state) => state.projects.selected);
  return (
    <CardContent className='py-2'>
      <h2 className='text-xl font-semibold'>{project!.title}</h2>
    </CardContent>
  );
};
export default ProjectCardBody;
