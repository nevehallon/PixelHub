import { toast } from "react-toastify";

import { AxiosResponse } from "axios";

import { LoginArgs } from "../interfaces/loginArgs";
import { UserDetails } from "../interfaces/UserDetails";
import httpService from "./httpService";

const url = process.env.GATSBY_API_URL;

const tokenKey = "localData";

export function getCurrentUser(): { [x: string]: any } | null {
  try {
    const localData = JSON.parse(localStorage.getItem(tokenKey) || "null");

    const { user } = localData;

    return user;
  } catch (error) {
    return null;
  }
}

export async function login({ email, password }: LoginArgs): Promise<void> {
  const { data } = await httpService.post(`${url}/authentication`, {
    strategy: "local",
    email,
    password,
  });

  if (!data.isPainter) {
    toast.success(`Logging in...`, {
      position: "top-center",
      autoClose: 2000,
    });
  }

  localStorage.setItem(tokenKey, JSON.stringify(data));
}

export async function logout(): Promise<void> {
  localStorage.removeItem(tokenKey);
}

export function getUserDetails(
  _id?: string
): Promise<AxiosResponse<UserDetails>> {
  const user = _id ? { _id } : getCurrentUser();
  return httpService.get(`${url}/users/${user!._id}`);
}

export function addFavorite(
  drawingNum: number | string
): Promise<AxiosResponse<UserDetails>> {
  return httpService.patch(`${url}/users?add-favorite=1`, {
    favorites: [drawingNum],
  });
}

export function removeFavorite(
  drawingNum: number | string
): Promise<AxiosResponse<UserDetails>> {
  return httpService.patch(`${url}/users?delete-favorite=1`, {
    favorites: [drawingNum],
  });
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  login,
  logout,
  getCurrentUser,
};
