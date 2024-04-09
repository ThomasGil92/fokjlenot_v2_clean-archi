import LoginFormFields from "../../molecules/Login/LoginFields";
import SubmitButton from "../../atoms/SubmitButton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/presentation/shadcn/components/ui/card";
import { z } from "zod";
import { Form } from "@/presentation/shadcn/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { login } from "@/domain/usecases/user/userUseCase";

export function LoginForm() {
  const navigate = useNavigate();

  const formSchema = z.object({
    email: z
      .string()
      .min(1, { message: "This field has to be filled." })
      .email("This is not a valid email."),
    password: z
      .string()
      .min(4, { message: "Your password should have 4 character min" }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "tgil849@gmail.com",
      password: "mabitesurtonfront92",
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    // e.preventDefault();
    const { email, password } = values;
    await login({ email, password });
    navigate("/dashboard");
    form.reset();
  };

  return (
    <Card className='w-1/2 h-min mx-auto'>
      <CardHeader>
        <CardTitle>Connexion</CardTitle>
        <CardDescription>Connect to your account</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form data-testid="loginForm" onSubmit={form.handleSubmit(handleSubmit)} className=''>
            <LoginFormFields form={form} />
            <SubmitButton text='Se connecter' />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
