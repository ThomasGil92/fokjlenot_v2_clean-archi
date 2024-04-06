import { router } from "@/presentation/Router";
import { Button } from "@/presentation/shadcn/components/ui/button";
import { useNavigate } from "react-router-dom";

interface NavigationButtonProps {
  action: () => void;
  textContent: string;
  testId: string;
  to?: `/${string}` | null;
}

const ActionButton = ({
  textContent,
  action,
  testId,
  to = null,
}: NavigationButtonProps) => {
    const navigate=useNavigate()
  const handleClick = async () => {
    try {
      to && navigate(to);
      action();
    } catch (error) {
      console.error("Une erreur est survenue");
    }
  };

  return (
    <Button variant='secondary' onClick={handleClick} data-testid={testId}>
      {textContent}
    </Button>
  );
};
export default ActionButton;
