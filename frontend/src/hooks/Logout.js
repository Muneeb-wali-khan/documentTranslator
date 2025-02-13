import { useLogoutUserMutation } from "../store/Features/auth.feature";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
  const [logoutUser, { isLoading }] = useLogoutUserMutation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser({}).unwrap();
      localStorage.clear();
      navigate("/");
    } catch (error) {
      localStorage.clear();
      navigate("/");
    }
  };

  return {
    logout: handleLogout,
    isloggingout: isLoading,
  };
};
