import { Metadata } from 'next';
import NoteForm from '@/components/NoteForm/NoteForm';
import css from './CreateNote.module.css';

export const metadata: Metadata = {
    title: "Create Note | NoteHub",
  description: "Create a new note and save your thoughts. Your progress is automatically saved as a draft.",
  alternates: {
    canonical: '/notes/action/create',
  },
  openGraph: {
    title: "Create Note | NoteHub",
    description: "Create a new note and save your thoughts.",
    url: "/notes/action/create",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
      }
    ],
  }
};

export default function CreateNotePage() {
    return (
        <main className={css.main}>
            <div className={css.container}>
                <h1 className={css.title}>Create note</h1>
                <NoteForm />
            </div>
        </main>
    );
}