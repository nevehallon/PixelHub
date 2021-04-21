import { toast } from "react-toastify";

import { AxiosResponse } from "axios";
import jwtDecode from "jwt-decode";

import { LoginArgs } from "../interfaces/loginArgs";
import { UserDetails } from "../interfaces/UserDetails";
import httpService from "./httpService";

const { API_URL } = process.env;

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
  const { data } = await httpService.post(`${API_URL}/authentication`, {
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
    `${API_URL}/users?numbers=${drawingNumList.toString()}`
  );
}

export function getCurrentUserDetails(
  _id?: string
): Promise<AxiosResponse<UserDetails>> {
  const user = _id ? { _id } : getCurrentUser();
  return httpService.get(`${API_URL}/users/${user!._id}`);
}

export function addFavorite(
  drawingNum: number | string
): Promise<AxiosResponse<UserDetails>> {
  return httpService.patch(`${API_URL}/users?add-favorite=1`, {
    favorites: [drawingNum],
  });
}

export function removeFavorite(
  drawingNum: number | string
): Promise<AxiosResponse<UserDetails>> {
  return httpService.patch(`${API_URL}/users?delete-favorite=1`, {
    favorites: [drawingNum],
  });
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  login,
  logout,
  getCurrentUser,
};
