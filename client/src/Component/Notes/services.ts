

import { Note,NoteFormData } from './schema';
// services/noteApi.js
import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5050/api/notes" });
// ✅ Add Authorization header if token exists
API.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
 API.interceptors.response.use(
    (response) => response,
    (error) => {
      const status = error.response?.status;
  
      if (status === 401 || status === 403) {
        // Token expired or unauthorized
        localStorage.removeItem("token"); // clear token
        window.location.href = "/login"; // redirect to login
      }
  
      return Promise.reject(error);
    }
  );
  export const getNotes = async (): Promise<Note[]> => {
    const res = await API.get<Note[]>("/all");
    return res.data;
  };
  
  export const createNote = async (note: Omit<Note, "_id" | "createdAt">): Promise<Note> => {
    const res = await API.post<Note>("/create", note);
    return res.data;
  };
  
  export const deleteNote = async (id: string): Promise<void> => {
    await API.delete(`/${id}`);
  };

  export const updateNote=async (id: string, data: NoteFormData) => {
   const res=await API.put(`/${id}`,data)
   return res.data;
  };