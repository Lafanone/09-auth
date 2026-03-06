import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <h2 className="text-2xl font-bold mb-4">404 - Page not found</h2>
      <p className="mb-4">Unfortunately, such a resource does not exist.</p>
      <Link href="/" style={{ color: 'blue', textDecoration: 'underline' }}>
        Return to home page
      </Link>
    </div>
  );
}