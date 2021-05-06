import { AxiosResponse } from "axios";

import { Drawing } from "../interfaces/Drawing";
import http from "./httpService";
import { getCurrentUser } from "./userService";

const url = process.env.GATSBY_API_URL;

const select =
  // eslint-disable-next-line max-len
  "&$select[]=_id&$select[]=drawingName&$select[]=description&$select[]=dataUrl&$select[]=drawingNumber&$select[]=painterInfo&$select[]=shareUrl";

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

export function getMyDrawings(skip?: number): Promise<AxiosResponse<any>> {
  const user = getCurrentUser();
  const _skip = skip ? `&$skip=${skip}` : "";

  return http.get(
    // eslint-disable-next-line max-len
    `${url}/drawings?user_id=${user?._id}${select}${_skip}`
  ); // TODO: limit to 10
}

export function getDrawing(
  id?: string,
  skip?: number,
  filter?: boolean,
  ...rest: any
): Promise<AxiosResponse<any>> {
  const _id = id ? `/${id}` : "";
  const _skip = skip ? `$skip=${skip}` : "";
  const _select = filter ? select : "";
  const _q = (_skip || _select || rest.length) && "?";
  try {
    return http.get(`${url}/drawings${_q}${_id}${_skip}${_select}${rest}`);
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
