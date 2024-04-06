import ActionButton from "@/presentation/components/atoms/shared/ActionButton";
import { NavigationMenuList } from "@/presentation/shadcn/components/ui/navigation-menu";
import NavigationButton from "@/presentation/components/atoms/shared/NavigationButton";
import {  useAppSelector } from "@/infrastructure/store";
import { logOut } from "@/domain/usecases/user/userUseCase";

const NavLinks = () => {
const isAuth=useAppSelector(state=>state.auth.isAuthenticated)
  return (
    <NavigationMenuList>
      {" "}
      <NavigationButton path='/signup' textContent='Sign Up' />
      {isAuth ? (
        <ActionButton
          action={logOut}
          textContent='Log Out'
          testId='logoutButton'
          to="/"
        />
      ) : (
        <NavigationButton path='/login' textContent='Log In' />
      )}
    </NavigationMenuList>
  );
};

export default NavLinks;
