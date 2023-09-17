import axios from "axios";
import { User } from "../types";

export const signup = async (user: Omit<User, "id" | "deposit">) => {
  await axios.post(`${process.env.REACT_APP_BACKEND}/auth/signup`, user);
};

export const signin = async (user: Omit<User, "id" | "deposit" | "role">) => {
  const response = await axios.post(
    `${process.env.REACT_APP_BACKEND}/auth/login`,
    user
  );
  const token = response.data.token;
  token && localStorage.setItem("token", token);
};

export const getCurrentUser = async () => {
  const token = localStorage.getItem("token");
  if (!token) return null;
  const response = await axios.get(`${process.env.REACT_APP_BACKEND}/user`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data as User;
};

export const logout = async () => {
  const token = localStorage.getItem("token");
  if (!token) return;
  await axios.post(
    `${process.env.REACT_APP_BACKEND}/auth/logout/all`,
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  localStorage.removeItem("token");
};

export const addBalance = async (deposit: number) => {
  const token = localStorage.getItem("token");
  if (!token) return;
  const response = await axios.patch(
    `${process.env.REACT_APP_BACKEND}/user/deposit`,
    { deposit },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};

export const purchaseProduct = async (productId: number, amount: number) => {
  const token = localStorage.getItem("token");
  if (!token) return;
  const response = await axios.post(
    `${process.env.REACT_APP_BACKEND}/purchase`,
    { productId, amount },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};

export const getAllProducts = async () => {
  const token = localStorage.getItem("token");
  if (!token) return;
  const response = await axios.get(`${process.env.REACT_APP_BACKEND}/product`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getAllPurchases = async () => {
  const token = localStorage.getItem("token");
  const response = await axios.get(
    `${process.env.REACT_APP_BACKEND}/purchase`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};
