import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { toggleTheme } from "../../features/theme/themeSlice";
import { selectThemeMode } from "../../features/theme/themeSelector";
import { useSelector } from "react-redux";

const BackButton = () => {
  const navigate = useNavigate();

  const mode = useSelector(selectThemeMode);

  const handleBack = () => {
    if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  return (
    <button
      onClick={handleBack}
      className="flex items-center gap-2 text-sm dark:text-gray-50 text-green-500 font-bold dark:hover:text-green-500 hover:text-gray-600 transition"
    >
      <ArrowLeft size={18} />
      Back
    </button>
  );
};

export default BackButton;