import Cookie from "js-cookie";
import { QueryFunctionContext } from "@tanstack/react-query";
import axios from "axios";
import { IUsernameLoginVariables } from "../types";

const instance = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1/",
  withCredentials: true,
});

export const getCafes = () =>
  instance.get("cafes/").then((response) => response.data);

export const getCafeDetail = ({ queryKey }: QueryFunctionContext) =>
  instance.get(`cafes/${queryKey[1]}`).then((response) => response.data);

export const getCafeReviews = ({ queryKey }: QueryFunctionContext) =>
  instance
    .get(`cafes/${queryKey[1]}/reviews/`)
    .then((response) => response.data);

export const getMe = () =>
  instance.get("users/me/").then((response) => response.data);

export const logOut = () =>
  instance
    .post("users/log-out/", null, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);

export const naverLogin = (code: string) =>
  instance
    .post(
      `users/naver/`,
      { code },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.status);

export const kakaoLogin = (code: string) =>
  instance
    .post(
      `users/kakao/`,
      { code },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.status);

export const usernameLogin = ({
  username,
  password,
}: IUsernameLoginVariables) =>
  instance
    .post(
      `users/log-in/`,
      { username, password },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.data);
