import { ReactNode } from 'react';

export default function Layout({
  children,
  sidebar,
}: {
  children: ReactNode;
  sidebar: ReactNode;
}) {
  return (
    <div style={{ display: 'flex', gap: '20px', padding: '20px' }}>
      <aside style={{ width: '250px', flexShrink: 0 }}>
        {sidebar}
      </aside>
      <main style={{ flexGrow: 1 }}>
        {children}
      </main>
    </div>
  );
}