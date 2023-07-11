import { QueryFunctionContext } from "@tanstack/react-query";
import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8000/api/v1/",
});

export const getCafes = () =>
  instance.get("cafes/").then((response) => response.data);

export const getCafeDetail = ({ queryKey }: QueryFunctionContext) =>
  instance.get(`cafes/${queryKey[1]}`).then((response) => response.data);

export const getCafeReviews = ({ queryKey }: QueryFunctionContext) =>
  instance
    .get(`cafes/${queryKey[1]}/reviews/`)
    .then((response) => response.data);
