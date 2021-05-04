import { AxiosResponse } from "axios";

import { Drawing } from "../interfaces/Drawing";
import http from "./httpService";

const url = process.env.GATSBY_API_URL;

export const initialGrid = (size = 35): { fill: string; touched: string }[] =>
  Array(size ** 2)
    .fill("")
    .map((_, i) => ({
      fill: i % 2 === 0 ? "lightgrey" : "white",
      touched: "",
    }));

export function createDrawing(drawing: Drawing): Promise<AxiosResponse<any>> {
  return http.post(`${url}/drawings`, drawing);
}

export function getMyDrawings(): Promise<AxiosResponse<any>> {
  return http.get(`${url}/drawings?my-drawings=1`);
}

export function getDrawing(id?: string): Promise<AxiosResponse<any>> {
  const _id = id ? `/${id}` : "";
  try {
    return http.get(`${url}/drawings${_id}`);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return error;
  }
}

export function deleteDrawing(id: string): Promise<AxiosResponse<any>> {
  try {
    return http.delete(`${url}/drawings/${id}`);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    throw error;
  }
}

export function editDrawing(drawing: Drawing): Promise<AxiosResponse<any>> {
  try {
    const { _id, ...data } = drawing;
    return http.put(`${url}/drawings/${_id}`, data);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    throw error;
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  initialGrid,
  createDrawing,
  getMyDrawings,
  getDrawing,
  editDrawing,
  deleteDrawing,
};
