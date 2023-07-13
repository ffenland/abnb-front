import { useEffect } from "react";
import useUser from "./useUser";
import { useNavigate } from "react-router-dom";

export const useProtectPage = () => {
  const { isLoggedIn, userLoading } = useUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (!userLoading) {
      if (!isLoggedIn) {
        navigate("/");
      }
    }
  }, [userLoading, isLoggedIn, navigate]);
};

export const useHostOnly = () => {
  const { user, userLoading } = useUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (!userLoading) {
      if (!user?.isHost) {
        navigate("/");
      }
    }
  }, [userLoading, user, navigate]);
};
