import axios from 'axios';
import { cookies } from 'next/headers';
import { User } from '@/types/user';
import { Note } from '@/types/note';

const serverAxios = axios.create({
  baseURL: 'https://notehub-api.goit.study', 
  withCredentials: true,
});

serverAxios.interceptors.request.use(async (config) => {
  const cookieStore = await cookies();

  const cookieString = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join('; ');

  if (cookieString) {
    config.headers.Cookie = cookieString;
  }
  
  return config;
});

export const checkSession = async () => {
  const res = await serverAxios.get<User>('/auth/session');
  return res.data;
};

export const getMe = async () => {
  const res = await serverAxios.get<User>('/users/me');
  return res.data;
};

export const fetchNotes = async (params?: { search?: string; page?: number; perPage?: number; tag?: string }) => {
  const res = await serverAxios.get<Note[]>('/notes', { 
    params: { perPage: 12, ...params } 
  });
  return res.data;
};

export const fetchNoteById = async (id: string) => {
  const res = await serverAxios.get<Note>(`/notes/${id}`);
  return res.data;
};