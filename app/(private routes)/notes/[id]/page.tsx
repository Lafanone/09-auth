import { Metadata } from 'next';
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api/serverApi';
import { proxy } from '@/app/proxy'; 
import NoteDetailsClient from './NoteDetails.client';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;

  try {
    const note = await fetchNoteById(params.id);
    
    return {
      title: `${note.title} | NoteHub`,
      description: note.content.substring(0, 160) + '...',
      openGraph: {
        title: `${note.title} | NoteHub`,
        description: note.content.substring(0, 160) + '...',
        url: `/notes/${params.id}`,
        images: [
          {
            url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          }
        ],
      }
    };
  } catch {
    return {
      title: "Note Not Found | NoteHub",
      description: "This note does not exist or has been deleted."
    }
  }
}

export default async function NoteDetailsPage({ params }: Props) {
    const resolvedParams = await params;
    const { id } = resolvedParams;

    await proxy(`/notes/${id}`, true);

    const queryClient = new QueryClient();
    
    await queryClient.prefetchQuery({
      queryKey: ['notes', id],
      queryFn: () => fetchNoteById(id),
    });

    return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}