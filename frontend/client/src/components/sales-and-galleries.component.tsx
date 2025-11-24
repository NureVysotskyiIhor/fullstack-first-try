import { useEffect, useState } from 'react';
import { usePaintingStore } from '@/store/painting.store';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

export const SalesAndGalleries = () => {
  const {
    sales,
    isLoading,
    error,
    fetchSales,
    registerSale,
    addGallery,
    markExpensive,
    clearError,
  } = usePaintingStore();

  // Sales form state
  const [saleForm, setSaleForm] = useState({
    paintingId: '',
    invoiceNumber: '',
    salePrice: '',
  });

  // Gallery form state
  const [galleryForm, setGalleryForm] = useState({
    name: '',
    location: '',
    info: '',
  });

  // Mark expensive form state
  const [galleryId, setGalleryId] = useState('');

  useEffect(() => {
    fetchSales();
    return () => clearError();
  }, [fetchSales, clearError]);

  const handleRegisterSale = async () => {
    if (!saleForm.paintingId || !saleForm.invoiceNumber || !saleForm.salePrice) return;

    const success = await registerSale(
      Number(saleForm.paintingId),
      Number(saleForm.invoiceNumber),
      Number(saleForm.salePrice)
    );

    if (success) {
      setSaleForm({ paintingId: '', invoiceNumber: '', salePrice: '' });
      alert('Sale registered successfully!');
    }
  };

  const handleAddGallery = async () => {
    if (!galleryForm.name || !galleryForm.location || !galleryForm.info) return;

    const success = await addGallery(galleryForm.name, galleryForm.location, galleryForm.info);

    if (success) {
      setGalleryForm({ name: '', location: '', info: '' });
      alert('Gallery added successfully!');
    }
  };

  const handleMarkExpensive = async () => {
    if (!galleryId) return;

    const success = await markExpensive(Number(galleryId));

    if (success) {
      setGalleryId('');
      alert('Paintings marked successfully!');
    }
  };

  return (
    <div className='max-w-7xl mx-auto px-4 py-8'>
      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-slate-900 mb-2'>Sales & Galleries</h1>
        <p className='text-slate-600'>Manage sales and gallery operations</p>
      </div>

      {error && (
        <Alert variant='destructive' className='mb-8'>
          <AlertCircle className='h-4 w-4' />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue='register-sale' className='w-full'>
        <TabsList className='grid w-full grid-cols-3'>
          <TabsTrigger value='register-sale'>Register Sale</TabsTrigger>
          <TabsTrigger value='add-gallery'>Add Gallery</TabsTrigger>
          <TabsTrigger value='mark-expensive'>Mark Expensive</TabsTrigger>
        </TabsList>

        {/* Register Sale Tab */}
        <TabsContent value='register-sale' className='space-y-6'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
            {/* Form */}
            <Card>
              <CardHeader>
                <CardTitle>Register New Sale</CardTitle>
                <CardDescription>Add a new painting sale to the system</CardDescription>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div>
                  <label className='text-sm font-medium text-slate-700'>Painting ID</label>
                  <Input
                    type='number'
                    placeholder='e.g., 3'
                    value={saleForm.paintingId}
                    onChange={e => setSaleForm({ ...saleForm, paintingId: e.target.value })}
                    className='mt-2'
                  />
                </div>
                <div>
                  <label className='text-sm font-medium text-slate-700'>Invoice Number</label>
                  <Input
                    type='number'
                    placeholder='e.g., 2001'
                    value={saleForm.invoiceNumber}
                    onChange={e => setSaleForm({ ...saleForm, invoiceNumber: e.target.value })}
                    className='mt-2'
                  />
                </div>
                <div>
                  <label className='text-sm font-medium text-slate-700'>Sale Price</label>
                  <Input
                    type='number'
                    placeholder='e.g., 35000'
                    value={saleForm.salePrice}
                    onChange={e => setSaleForm({ ...saleForm, salePrice: e.target.value })}
                    className='mt-2'
                  />
                </div>
                <Button
                  onClick={handleRegisterSale}
                  disabled={
                    !saleForm.paintingId ||
                    !saleForm.invoiceNumber ||
                    !saleForm.salePrice ||
                    isLoading
                  }
                  className='w-full'
                >
                  {isLoading ? <Loader2 className='w-4 h-4 mr-2 animate-spin' /> : null}
                  Register Sale
                </Button>
              </CardContent>
            </Card>

            {/* Sales List */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Sales</CardTitle>
                <CardDescription>{sales.length} total sales</CardDescription>
              </CardHeader>
              <CardContent>
                {sales.length > 0 ? (
                  <div className='space-y-3 max-h-96 overflow-y-auto'>
                    {sales.map(sale => (
                      <div
                        key={sale.saleId}
                        className='p-3 bg-slate-50 rounded-md border border-slate-200'
                      >
                        <p className='font-semibold text-slate-900'>
                          ${sale.salePrice.toLocaleString()}
                        </p>
                        <p className='text-sm text-slate-600'>Invoice: {sale.invoiceNumber}</p>
                        <p className='text-xs text-slate-500'>
                          {new Date(sale.saleDate).toLocaleDateString()}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className='text-sm text-slate-600'>No sales recorded yet</p>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Add Gallery Tab */}
        <TabsContent value='add-gallery' className='space-y-6'>
          <Card>
            <CardHeader>
              <CardTitle>Create New Gallery</CardTitle>
              <CardDescription>Add a new gallery to the system</CardDescription>
            </CardHeader>
            <CardContent className='max-w-xl space-y-4'>
              <div>
                <label className='text-sm font-medium text-slate-700'>Gallery Name</label>
                <Input
                  type='text'
                  placeholder='e.g., Modern Art Gallery'
                  value={galleryForm.name}
                  onChange={e => setGalleryForm({ ...galleryForm, name: e.target.value })}
                  className='mt-2'
                />
              </div>
              <div>
                <label className='text-sm font-medium text-slate-700'>Location</label>
                <Input
                  type='text'
                  placeholder='e.g., Kyiv, Podil district'
                  value={galleryForm.location}
                  onChange={e => setGalleryForm({ ...galleryForm, location: e.target.value })}
                  className='mt-2'
                />
              </div>
              <div>
                <label className='text-sm font-medium text-slate-700'>Description</label>
                <textarea
                  placeholder='Gallery information...'
                  value={galleryForm.info}
                  onChange={e => setGalleryForm({ ...galleryForm, info: e.target.value })}
                  className='w-full mt-2 px-3 py-2 border border-slate-300 rounded-md text-sm'
                  rows={4}
                />
              </div>
              <Button
                onClick={handleAddGallery}
                disabled={
                  !galleryForm.name || !galleryForm.location || !galleryForm.info || isLoading
                }
                className='w-full'
              >
                {isLoading ? <Loader2 className='w-4 h-4 mr-2 animate-spin' /> : null}
                Add Gallery
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Mark Expensive Tab */}
        <TabsContent value='mark-expensive' className='space-y-6'>
          <Card>
            <CardHeader>
              <CardTitle>Mark Expensive & Cheap Paintings</CardTitle>
              <CardDescription>Mark paintings in a gallery as expensive or cheap</CardDescription>
            </CardHeader>
            <CardContent className='max-w-xl space-y-4'>
              <div>
                <label className='text-sm font-medium text-slate-700'>Gallery ID</label>
                <Input
                  type='number'
                  placeholder='e.g., 1'
                  value={galleryId}
                  onChange={e => setGalleryId(e.target.value)}
                  className='mt-2'
                />
              </div>
              <Button
                onClick={handleMarkExpensive}
                disabled={!galleryId || isLoading}
                className='w-full'
              >
                {isLoading ? <Loader2 className='w-4 h-4 mr-2 animate-spin' /> : null}
                Mark Paintings
              </Button>

              <div className='mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200'>
                <p className='text-sm text-blue-900'>
                  <strong>How it works:</strong> This procedure will analyze paintings in the
                  selected gallery and mark them as expensive or cheap based on their prices
                  relative to others.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
