import { useEffect, useState } from 'react';
import { usePaintingStore } from '@/store/painting.store';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, AlertCircle, ArrowLeft, Trash2 } from 'lucide-react';
import { Link, useNavigate } from '@tanstack/react-router';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface PaintingDetailPageProps {
  id: string;
}

export const PaintingDetail = ({ id }: PaintingDetailPageProps) => {
  const navigate = useNavigate();
  const { currentPainting, isLoading, error, fetchPaintingById, clearError, registerSale, deletePainting } =
    usePaintingStore();
  const [salePrice, setSalePrice] = useState('');
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  
  useEffect(() => {
    fetchPaintingById(Number(id));
    return () => clearError();
  }, [id, fetchPaintingById, clearError]);

  const handleRegisterSale = async () => {
    if (!salePrice || !invoiceNumber || !currentPainting) return;

    const success = await registerSale(
      currentPainting.paintingId,
      Number(invoiceNumber),
      Number(salePrice)
    );

    if (success) {
      setSalePrice('');
      setInvoiceNumber('');
      alert('Sale registered successfully!');
    }
  };

  const handleDeletePainting = async () => {
    if (!currentPainting) return;

    const success = await deletePainting(currentPainting.paintingId);
    
    if (success) {
      alert('Painting deleted successfully!');
      await navigate({ to: '/paintings' });
    }
  };

  if (isLoading) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <Loader2 className='w-8 h-8 animate-spin text-blue-600' />
      </div>
    );
  }

  if (error) {
    return (
      <div className='max-w-7xl mx-auto px-4 py-8'>
        <Link
          to='/paintings'
          className='flex items-center gap-2 text-blue-600 hover:underline mb-4'
        >
          <ArrowLeft className='w-4 h-4' />
          Back to Paintings
        </Link>
        <Alert variant='destructive'>
          <AlertCircle className='h-4 w-4' />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!currentPainting) {
    return (
      <div className='max-w-7xl mx-auto px-4 py-8'>
        <Link
          to='/paintings'
          className='flex items-center gap-2 text-blue-600 hover:underline mb-4'
        >
          <ArrowLeft className='w-4 h-4' />
          Back to Paintings
        </Link>
        <p className='text-slate-600'>Painting not found</p>
      </div>
    );
  }

  if (!currentPainting.artist || !currentPainting.gallery) {
    return (
      <div className='max-w-7xl mx-auto px-4 py-8'>
        <Link
          to='/paintings'
          className='flex items-center gap-2 text-blue-600 hover:underline mb-4'
        >
          <ArrowLeft className='w-4 h-4' />
          Back to Paintings
        </Link>
        <Alert variant='destructive'>
          <AlertCircle className='h-4 w-4' />
          <AlertDescription>
            {!currentPainting.artist ? 'Artist information is missing.' : 'Gallery information is missing. Please contact support.'}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const { artist, gallery, sales } = currentPainting;

  return (
    <div className='max-w-7xl mx-auto px-4 py-8'>
      <div className='flex items-center justify-between mb-6'>
        <Link to='/paintings' className='flex items-center gap-2 text-blue-600 hover:underline'>
          <ArrowLeft className='w-4 h-4' />
          Back to Paintings
        </Link>
        {showDeleteConfirm && (
          <div className='flex gap-2'>
            <Button
              onClick={handleDeletePainting}
              disabled={isLoading}
              className='bg-red-600 hover:bg-red-700'
            >
              Confirm Delete
            </Button>
            <Button
              onClick={() => setShowDeleteConfirm(false)}
              variant='outline'
              disabled={isLoading}
            >
              Cancel
            </Button>
          </div>
        )}
        {!showDeleteConfirm && (
          <Button
            onClick={() => setShowDeleteConfirm(true)}
            variant='destructive'
            size='sm'
          >
            <Trash2 className='w-4 h-4 mr-2' />
            Delete Painting
          </Button>
        )}
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
        {/* Main Content */}
        <div className='lg:col-span-2 space-y-6'>
          <Card>
            <CardHeader>
              <CardTitle className='text-3xl'>{currentPainting.title}</CardTitle>
              <CardDescription>{currentPainting.style}</CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <p className='text-sm text-slate-600'>Price</p>
                  <p className='text-2xl font-bold text-blue-600'>
                    ${currentPainting.price.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className='text-sm text-slate-600'>Year Created</p>
                  <p className='text-2xl font-bold'>{currentPainting.yearCreated}</p>
                </div>
              </div>
              <div>
                <p className='text-sm text-slate-600 mb-2'>Description</p>
                <p className='text-slate-700'>{currentPainting.description}</p>
              </div>
            </CardContent>
          </Card>

          {/* Artist Info */}
          <Card>
            <CardHeader>
              <CardTitle>Artist</CardTitle>
            </CardHeader>
            <CardContent className='space-y-3'>
              <div>
                <p className='text-sm text-slate-600'>Name</p>
                <p className='font-semibold'>{artist.name}</p>
              </div>
              <div>
                <p className='text-sm text-slate-600'>Address</p>
                <p>{artist.address}</p>
              </div>
              <div>
                <p className='text-sm text-slate-600'>Information</p>
                <p className='text-sm text-slate-700'>{artist.information}</p>
              </div>
            </CardContent>
          </Card>

          {/* Gallery Info */}
          <Card>
            <CardHeader>
              <CardTitle>Gallery</CardTitle>
            </CardHeader>
            <CardContent className='space-y-3'>
              <div>
                <p className='text-sm text-slate-600'>Name</p>
                <p className='font-semibold'>{gallery.name}</p>
              </div>
              <div>
                <p className='text-sm text-slate-600'>Location</p>
                <p>{gallery.location}</p>
              </div>
              <div>
                <p className='text-sm text-slate-600'>Info</p>
                <p className='text-sm text-slate-700'>{gallery.info}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className='space-y-6'>
          {/* Register Sale */}
          <Card>
            <CardHeader>
              <CardTitle>Register Sale</CardTitle>
              <CardDescription>Add a new sale for this painting</CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div>
                <label className='text-sm font-medium text-slate-700'>Invoice Number</label>
                <input
                  type='number'
                  value={invoiceNumber}
                  onChange={e => setInvoiceNumber(e.target.value)}
                  placeholder='5001'
                  className='w-full mt-2 px-3 py-2 border border-slate-300 rounded-md'
                />
              </div>
              <div>
                <label className='text-sm font-medium text-slate-700'>Sale Price</label>
                <input
                  type='number'
                  value={salePrice}
                  onChange={e => setSalePrice(e.target.value)}
                  placeholder='35000'
                  className='w-full mt-2 px-3 py-2 border border-slate-300 rounded-md'
                />
              </div>
              <Button
                onClick={handleRegisterSale}
                disabled={!salePrice || !invoiceNumber || isLoading}
                className='w-full'
              >
                Register Sale
              </Button>
            </CardContent>
          </Card>

          {/* Sales History */}
          <Card>
            <CardHeader>
              <CardTitle>Sales History</CardTitle>
              <CardDescription>{sales?.length || 0} sales</CardDescription>
            </CardHeader>
            <CardContent>
              {sales && sales.length > 0 ? (
                <div className='space-y-3'>
                  {sales.map(sale => (
                    <div key={sale.saleId} className='text-sm p-3 bg-slate-50 rounded-md'>
                      <p className='font-medium'>${sale.salePrice.toLocaleString()}</p>
                      <p className='text-slate-600'>Invoice: {sale.invoiceNumber}</p>
                      <p className='text-slate-500'>
                        {new Date(sale.saleDate).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className='text-sm text-slate-600'>No sales yet</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};