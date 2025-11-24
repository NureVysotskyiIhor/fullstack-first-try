import { useEffect, useState } from 'react';
import { usePaintingStore } from '@/store/painting.store';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, AlertCircle, Eye } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { Alert, AlertDescription } from '@/components/ui/alert';

export const Paintings = () => {
  const { paintingsByPrice, isLoading, error, getPaintingsByPrice, clearError } =
    usePaintingStore();
  const [maxPrice, setMaxPrice] = useState('50000');
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    return () => {
      clearError();
      usePaintingStore.setState({ paintingsByPrice: [] });
    }
  }, [clearError]);

  const handleSearch = async () => {
    if (!maxPrice) return;
    setSearched(true);
    await getPaintingsByPrice(Number(maxPrice));
  };

  if (error && searched) {
    return (
      <div className='max-w-7xl mx-auto px-4 py-8'>
        <Alert variant='destructive'>
          <AlertCircle className='h-4 w-4' />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className='max-w-7xl mx-auto px-4 py-8'>
      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-slate-900 mb-2'>Paintings by Price</h1>
        <p className='text-slate-600'>Find paintings within your budget</p>
      </div>

      <Card className='mb-8'>
        <CardHeader>
          <CardTitle>Filter by Price</CardTitle>
          <CardDescription>Search paintings cheaper than a maximum price</CardDescription>
        </CardHeader>
        <CardContent className='flex gap-4 flex-col sm:flex-row'>
          <Input
            type='number'
            placeholder='Enter max price (e.g., 50000)'
            value={maxPrice}
            onChange={e => setMaxPrice(e.target.value)}
            className='flex-1'
          />
          <Button onClick={handleSearch} disabled={!maxPrice || isLoading} className='sm:w-32'>
            {isLoading ? (
              <>
                <Loader2 className='w-4 h-4 mr-2 animate-spin' />
                Searching...
              </>
            ) : (
              'Search'
            )}
          </Button>
        </CardContent>
      </Card>

      {isLoading && (
        <div className='flex items-center justify-center py-12'>
          <Loader2 className='w-8 h-8 animate-spin text-blue-600' />
        </div>
      )}

      {searched && !isLoading && paintingsByPrice.length === 0 && (
        <Card className='text-center py-12'>
          <p className='text-slate-600'>No paintings found for the selected price</p>
        </Card>
      )}

      {!isLoading && paintingsByPrice.length > 0 && (
        <>
          <div className='mb-4'>
            <p className='text-sm text-slate-600'>
              Found <span className='font-semibold text-slate-900'>{paintingsByPrice.length}</span>{' '}
              paintings
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {paintingsByPrice.map(painting => (
              <Card key={painting.paintingId} className='hover:shadow-lg transition-shadow'>
                <CardHeader>
                  <CardTitle className='line-clamp-2'>{painting.title}</CardTitle>
                  <CardDescription>{painting.artistName}</CardDescription>
                </CardHeader>
                <CardContent className='space-y-4'>
                  <div>
                    <p className='text-sm text-slate-600'>Price</p>
                    <p className='text-2xl font-bold text-blue-600'>
                      ${painting.price.toLocaleString()}
                    </p>
                  </div>
                  <Link 
                    to='/painting/$id' 
                    params={{ id: painting.paintingId.toString() }}
                    className='w-full'
                  >
                    <Button className='w-full' variant='outline' asChild>
                      <span className='flex items-center justify-center'>
                        <Eye className='w-4 h-4 mr-2' />
                        View Details
                      </span>
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}

      {!searched && (
        <Card className='text-center py-12'>
          <p className='text-slate-600'>Enter a price and click search to find paintings</p>
        </Card>
      )}
    </div>
  );
};
