import { useQuery } from "@tanstack/react-query";
import { getMe } from "./api";
import type { IUser } from "../types";

const useUser = () => {
  const { isLoading, data, isError } = useQuery<IUser>(["me"], getMe, {
    retry: false,
  });

  return {
    userLoading: isLoading,
    user: data,
    isLoggedIn: !isError,
  };
};

export default useUser;
