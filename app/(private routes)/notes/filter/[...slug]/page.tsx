import { Metadata } from 'next';
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api/serverApi';
import NotesClient from './Notes.client';

interface Props {
  params: Promise<{
    slug: string[];
  }>;
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const tagParam = decodeURIComponent(params.slug[0]);
  const filterName = tagParam === 'all' ? 'All Notes' : `Category: ${tagParam}`;

  return {
    title: `${filterName} | NoteHub`,
    description: `Viewing notes for filter: ${filterName}`,
    openGraph: {
      title: `${filterName} | NoteHub`,
      description: `Viewing notes for filter: ${filterName}`,
      url: `/notes/filter/${params.slug.join('/')}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        }
      ],
    }
  };
}

export default async function FilteredNotesPage(props: Props) {
  const params = await props.params;
  const tagParam = decodeURIComponent(params.slug[0]);
  const queryTag = tagParam === 'all' ? undefined : tagParam;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', tagParam, 1, ''],
    queryFn: () => fetchNotes({ page: 1, perPage: 12, search: undefined, tag: queryTag }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient key={tagParam} tagParam={tagParam} />
    </HydrationBoundary>
  );
}