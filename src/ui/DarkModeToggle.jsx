import { useDarkMode } from "../contexts/DarkModeContext";
import { BsSun, BsFillMoonFill } from "react-icons/bs";

function DarkModeToggle() {
  const { isDarkMode, setIsDarkMode } = useDarkMode();
  function handleDarkMode() {
    document.documentElement.classList.toggle("dark");
    if (document.documentElement.classList.contains("dark")) {
      setIsDarkMode(true);
    } else {
      setIsDarkMode(false);
    }
  }
  return (
    <button
      onClick={handleDarkMode}
      className="dark:bg-orange-400 bg-orange-800 text-orange-200 p-2 rounded-full hover:bg-orange-700 absolute top-[-40px] right-2"
    >
      {isDarkMode ? <BsSun /> : <BsFillMoonFill />}
    </button>
  );
}

export default DarkModeToggle;
