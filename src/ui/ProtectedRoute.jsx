import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "../contexts/UserContext";
function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { isLoggedIn } = useCurrentUser();
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [navigate, isLoggedIn]);

  return children;
}

export default ProtectedRoute;
