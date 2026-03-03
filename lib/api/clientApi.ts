import { api } from './api';
import { User } from '@/types/user';
import { Note } from '@/types/note'; 

export interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

export const register = async (data: Record<string, string>) => {
  const res = await api.post<User>('/auth/register', data);
  return res.data;
};

export const login = async (data: Record<string, string>) => {
  const res = await api.post<User>('/auth/login', data);
  return res.data;
};

export const logout = async () => {
  await api.post('/auth/logout');
};

export const checkSession = async () => {
  const res = await api.get<User>('/auth/session');
  return res.data;
};

export const getMe = async () => {
  const res = await api.get<User>('/users/me');
  return res.data;
};

export const updateMe = async (data: Partial<User>) => {
  const res = await api.patch<User>('/users/me', data);
  return res.data;
};

export const fetchNotes = async (params?: { search?: string; page?: number; perPage?: number; tag?: string }) => {
  const res = await api.get<Note[] | NotesResponse>('/notes', { 
    params: { perPage: 12, ...params } 
  });
  return res.data;
};

export const fetchNoteById = async (id: string) => {
  const res = await api.get<Note>(`/notes/${id}`);
  return res.data;
};

export const createNote = async (data: { title: string; content: string; tag: string }) => {
  const res = await api.post<Note>('/notes', data);
  return res.data;
};

export const deleteNote = async (id: string) => {
  const res = await api.delete<Note>(`/notes/${id}`);
  return res.data;
};