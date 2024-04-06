import { NavigationMenu } from "@/presentation/shadcn/components/ui/navigation-menu";
import NavLinks from "@/presentation/components/molecules/Layout/NavLinks";
import NavLogo from "@/presentation/components/atoms/Layout/NavLogo";
const NavigationTopBar = () => {
  return (
    
      <NavigationMenu className='fixed top-0 z-10 py-3 px-10 flex justify-between align-middle bg-slate-600'>
        <NavLogo/>
        <NavLinks />
      </NavigationMenu>
 
  );
};

export default NavigationTopBar;
