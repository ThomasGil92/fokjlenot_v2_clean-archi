import { UseFormReturn } from "react-hook-form";
import FormFieldZ from "../../atoms/FormField";

interface LoginFieldsInterface {
  form: UseFormReturn<
    {
      email: string;
      password: string;
    },
    unknown,
    undefined
  >;
}

const LoginFields: React.FC<LoginFieldsInterface> = ({ form }) => {
  return (
    <>
      <FormFieldZ
        placeholder='Adresse email'
        label='Email:'
        type='email'
        form={form}
        name='email'
        required
      />
      <FormFieldZ
        placeholder='Mot de passe'
        label='Mot de passe:'
        type='password'
        form={form}
        name='password'
        required
      />
    </>
  );
};

export default LoginFields;