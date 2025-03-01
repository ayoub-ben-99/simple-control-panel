import axios from "axios";

const API_URL = "http://localhost:5000/users";

export const fetchUsers = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const viewUser = async (id, userData) => {
  const response = await axios.get(`${API_URL}/view/${id}`, userData);
  return response.data;
};

export const createUser = async (userData) => {
  const response = await axios.post(`${API_URL}/add`, userData);
  return response.data;
};

export const updateUser = async (id, userData) => {
  const response = await axios.put(`${API_URL}/update/${id}`, userData);
  return response.data;
};

export const deleteUser = async (id) => {
  const response = await axios.delete(`${API_URL}/delete/${id}`);
  return response.data;
};
