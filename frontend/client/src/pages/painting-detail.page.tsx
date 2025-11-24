import { PaintingDetail } from '@/components/painting-detail.component';

interface PaintingDetailPageProps {
  id: string;
}


const PaintingDetailPage = ({ id }: PaintingDetailPageProps) => {

  return (
    <div className='p-2'>
      <PaintingDetail id={id} />
    </div>
  );
};

export default PaintingDetailPage;
