// src/routes/paintings.tsx
import { createFileRoute } from '@tanstack/react-router';
import PaintingsPage from '@/pages/paintings.page';

export const Route = createFileRoute('/paintings')({
  component: Paintings,
});

function Paintings() {
  return <PaintingsPage />;
}
