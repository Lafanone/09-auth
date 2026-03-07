import { create } from 'zustand';
import { Note } from '@/types/note';

interface DraftNote {
  title: string;
  tag: string;
  content: string;
}

interface NoteStore {
  notes: Note[];
  setNotes: (notes: Note[]) => void;
  draft: DraftNote;
  updateDraft: (updates: Partial<DraftNote>) => void;
  clearDraft: () => void;
}

const initialDraft: DraftNote = {
  title: '',
  tag: 'Todo',
  content: ''
};

export const useNoteStore = create<NoteStore>()((set) => ({
  notes: [],
  setNotes: (notes) => set({ notes }),

  draft: initialDraft,

  updateDraft: (updates) => set((state) => ({ 
    draft: { ...state.draft, ...updates } 
  })),

  clearDraft: () => set({ draft: initialDraft }),
}));