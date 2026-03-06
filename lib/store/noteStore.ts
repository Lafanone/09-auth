import { create } from 'zustand';
import { Note } from '@/types/note';

interface NoteStore {
  notes: Note[];
  setNotes: (notes: Note[]) => void;
}

export const useNoteStore = create<NoteStore>()((set) => ({
  notes: [],
  setNotes: (notes) => set({ notes }),
}));