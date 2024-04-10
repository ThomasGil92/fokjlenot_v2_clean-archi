import { ProjectStatus } from "@/domain/entities/Project";
import { UseFormReturn } from "react-hook-form";

interface AddProjectFieldsInterface {
  form: UseFormReturn<
    {
      id: string;
      title: string;
      status: ProjectStatus;
      owner: string;
      collaborators: string[];
    },
    any,
    undefined
  >;
}

const AddProjectFormFields: React.FC<AddProjectFieldsInterface> = ({
  form,
}) => {
  return <></>;
};

export default AddProjectFormFields;
