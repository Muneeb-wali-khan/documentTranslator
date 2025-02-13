import { useNavigate } from "react-router-dom";

export const ResetNavigations = (routeName) => {
  const navigate = useNavigate();

  return () => {
    navigate(routeName, { replace: true });
  };
};
