import { toast } from "react-toastify";

import { AxiosResponse } from "axios";
import jwtDecode from "jwt-decode";

import { apiUrl } from "../config.json";
import { LoginArgs } from "../interfaces/loginArgs";
import { UserDetails } from "../interfaces/UserDetails";
import httpService from "./httpService";

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
  const { data } = await httpService.post(`${apiUrl}/authentication`, {
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

export function getDrawingsFromAllUsers(
  drawingNumList: any[]
): Promise<AxiosResponse<any>> {
  return httpService.get(
    `${apiUrl}/users?numbers=${drawingNumList.toString()}`
  );
}

export function getUserDetailsByUserId(
  userId: string
): Promise<AxiosResponse<UserDetails>> {
  return httpService.get(`${apiUrl}/users?id=${userId}`);
}

export function getCurrentUserDetails(): Promise<AxiosResponse<UserDetails>> {
  const user = getCurrentUser();
  return httpService.get(`${apiUrl}/users/${user!._id}`);
}

export function addFavorite(
  drawingNum: number | string
): Promise<AxiosResponse<UserDetails>> {
  return httpService.patch(`${apiUrl}/users?add-favorite`, {
    favorites: [drawingNum],
  });
}

export function removeFavorite(
  drawingNum: number | string
): Promise<AxiosResponse<UserDetails>> {
  return httpService.patch(`${apiUrl}/users?delete-favorite`, {
    favorites: [drawingNum],
  });
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  login,
  logout,
  getCurrentUser,
};
