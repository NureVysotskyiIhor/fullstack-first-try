import { createFileRoute } from '@tanstack/react-router';
import SalesAndGalleriesPage from '@/pages/sales-and-galleries.page';

export const Route = createFileRoute('/sales')({
  component: Paintings,
});

function Paintings() {
  return <SalesAndGalleriesPage />;
}
