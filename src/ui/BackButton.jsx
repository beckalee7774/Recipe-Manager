import { useNavigate } from "react-router-dom";

function BackButton() {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(-1)}
      className="text-xs p-1 hover:text-orange-100"
    >
      &larr; Back
    </button>
  );
}

export default BackButton;
