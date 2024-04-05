import { Button } from "@/presentation/shadcn/components/ui/button";

const SubmitButton: React.FC<{ text: string }> = ({ text }) => {
  return (
    <Button className='mt-2' type='submit' data-testid='loginButton'>
      {text}
    </Button>
  );
};
export default SubmitButton;
