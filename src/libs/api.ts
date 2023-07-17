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

export const getFacilities = () =>
  instance.get("cafes/facilities/").then((response) => response.data);

export const getCategories = () =>
  instance.get("categories/").then((response) => response.data);

export interface IUploadCafeVariables {
  name: string;
  address: string;
  detail_address: string;
  description: string;
  pet_allowed: boolean;
  kind: string;
  facilities: number[];
  category: number;
}

export const uploadCafe = (variables: IUploadCafeVariables) =>
  instance
    .post(`cafes/`, variables, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);

export const getUploadUrl = () =>
  instance
    .post(`medias/photos/get-url/`, null, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);

export const uploadImage = async ({
  file,
  uploadURL,
}: {
  file: FileList;
  uploadURL: string;
}) => {
  const form = new FormData();
  form.append("file", file[0]);
  return axios
    .post(uploadURL, form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => response.data);
};

export interface ICreatePhotoVariables {
  cf_id: string;
  description: string;
  cafePk: string;
}

export const createPhoto = ({
  cf_id,
  description,
  cafePk,
}: ICreatePhotoVariables) =>
  instance
    .post(
      `cafes/${cafePk}/photos/`,
      { cf_id, description },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.data);
