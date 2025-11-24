import PaintingDetailPage from '@/pages/painting-detail.page';
import { createFileRoute } from '@tanstack/react-router';
import { useParams } from '@tanstack/react-router';

export const Route = createFileRoute('/painting/$id')({
  component: PaintingDetailPageRoute,
});

function PaintingDetailPageRoute() {
  const { id } = useParams({ from: '/painting/$id' });
  return <PaintingDetailPage id={id}/>;
}
