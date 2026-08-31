import Logo from "./Logo";
import NavLinks from "./NavLinks";
import AuthButtons from "./AuthButtons";
import MobileMenu from "./MobileMenu";

function Header() {
  return (
    <header className="fixed top-0 right-0 left-0 z-40 w-full border-b border-slate-200 bg-white backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:h-20 lg:px-8">
        <Logo />
        <NavLinks />
        <AuthButtons />
        <MobileMenu />
      </div>
    </header>
  );
}

export default Header;