'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote } from '@/lib/api';
import { useNoteStore } from '@/lib/store/noteStore';
import css from './NoteForm.module.css'; 

export default function NoteForm() {
  const router = useRouter();
  const queryClient = useQueryClient();
  
  const { draft, setDraft, clearDraft } = useNoteStore();

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      clearDraft();
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      router.back(); 
    },
  });

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!draft.title.trim() || !draft.content.trim()) return; 
    mutation.mutate({ title: draft.title, content: draft.content, tag: draft.tag });
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <form onSubmit={handleSubmit} className={css.form}>
      <label className={css.label}>
        Title:
        <input
          type="text"
          name="title"
          value={draft.title}
          onChange={(e) => setDraft({ title: e.target.value })}
          className={css.input}
          required
        />
      </label>

      <label className={css.label}>
        Tag:
        <select
          name="tag"
          value={draft.tag}
          onChange={(e) => setDraft({ tag: e.target.value })}
          className={css.select}
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </label>

      <label className={css.label}>
        Content:
        <textarea
          name="content"
          value={draft.content}
          onChange={(e) => setDraft({ content: e.target.value })}
          className={css.textarea}
          required
        />
      </label>

      <div className={css.buttonGroup}>
        <button type="submit" disabled={mutation.isPending} className={css.submitBtn}>
          {mutation.isPending ? 'Saving...' : 'Save Note'}
        </button>
        <button type="button" onClick={handleCancel} className={css.cancelBtn}>
          Cancel
        </button>
      </div>
    </form>
  );
}