import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/presentation/shadcn/components/ui/form";
import { Input } from "@/presentation/shadcn/components/ui/input";
import { UseFormReturn } from "react-hook-form";
interface FormFieldInterface {
  type: string;

  name: "email" | "password";
  required: boolean;
  label: string;
  placeholder: string;
  form: UseFormReturn<
    {
      email: string;
      password: string;
    },
    unknown,
    undefined
  >;
}

const FormFieldZ = ({
  type,
  name,
  placeholder,
  label,
  form,
}: FormFieldInterface) => {
  return (
    <>
      <FormField
        name={name}
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel htmlFor={`#${name}`}>{label}</FormLabel>
            <FormControl>
              <Input
                {...field}
                type={type}
                placeholder={placeholder}
                id={name}
                data-testid={name}
              />
            </FormControl>
            <FormDescription>This is your public display name.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default FormFieldZ;
