import { useEffect, useState } from "react";
import { isAuthenticated } from "../Utils/Utils";
import { useNavigate } from "react-router-dom";

export const useAuthCheck = (path = "/auth/login"): boolean | null => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    isAuthenticated().then((response) => {
      if (!response) {
        navigate(path);
      } else {
        setIsLoggedIn(response);
      }
    });
  }, [path, navigate]);

  return isLoggedIn;
};
