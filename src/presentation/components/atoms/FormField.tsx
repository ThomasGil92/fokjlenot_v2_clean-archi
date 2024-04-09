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
  description_helper?:string;
}

const FormFieldZ = ({
  type,
  name,
  placeholder,
  label,
  form,
  description_helper,
}: FormFieldInterface) => {
  return (
    <>
      <FormField
        name={name}
        control={form.control}
        render={({ field }) => (
          <FormItem className='mb-5'>
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
            {description_helper && (
              <FormDescription>{description_helper}</FormDescription>
            )}
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default FormFieldZ;
