import { useDarkMode } from "../contexts/DarkModeContext";

function Logo() {
  const { isDarkMode } = useDarkMode();
  return (
    <img
      src={
        isDarkMode
          ? "https://lyeutanfhwlnpalhenaj.supabase.co/storage/v1/object/public/logo/Recipe-Manager.png"
          : "https://lyeutanfhwlnpalhenaj.supabase.co/storage/v1/object/public/logo/Recipe-Manager-light.png"
      }
      alt="logo"
      className="w-full h-[auto]"
    />
  );
}

export default Logo;
