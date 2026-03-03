'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import Modal from '@/components/Modal/Modal';
import { fetchNoteById } from '@/lib/api';
import css from './NotePreview.module.css'; 

export default function NotePreviewClient() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const { data: note, isLoading, isError } = useQuery({
    queryKey: ['notes', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  const handleClose = () => {
    router.back();
  };

  if (isLoading) {
    return (
      <Modal isOpen={true} onClose={handleClose}>
        <div className={css.container}><p>Loading...</p></div>
      </Modal>
    );
  }

  if (isError || !note) {
    return (
      <Modal isOpen={true} onClose={handleClose}>
        <div className={css.container}><p>Error loading note</p></div>
      </Modal>
    );
  }

  return (
    <Modal isOpen={true} onClose={handleClose}>
      <div className={css.container}>
        <h2 className={css.title}>{note.title}</h2>
        <div className={css.meta}>
          <span className={css.tag}>{note.tag || 'No Tag'}</span>
          <span className={css.date}>
            {new Date(note.createdAt).toLocaleDateString()}
          </span>
        </div>
        <div className={css.content}>{note.content}</div>
      </div>
    </Modal>
  );
}