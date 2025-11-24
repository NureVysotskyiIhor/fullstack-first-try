import { useState } from 'react';
import { usePaintingStore } from '@/store/painting.store';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, AlertCircle, BarChart3 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

export const Statistics = () => {
  const { isFetching, error, clearError, getPaintingsCheaperThan, getArtistsByRegion } =
    usePaintingStore();

  const [priceCount, setPriceCount] = useState<number | null>(null);
  const [priceInput, setPriceInput] = useState('50000');
  const [searchedPrice, setSearchedPrice] = useState(false);

  const [artistCount, setArtistCount] = useState<number | null>(null);
  const [regionInput, setRegionInput] = useState('Kyiv');
  const [searchedRegion, setSearchedRegion] = useState(false);

  const handlePriceSearch = async () => {
    if (!priceInput) return;
    setSearchedPrice(true);
    const count = await getPaintingsCheaperThan(Number(priceInput));
    setPriceCount(count);
    clearError();
  };

  const handleRegionSearch = async () => {
    if (!regionInput) return;
    setSearchedRegion(true);
    const count = await getArtistsByRegion(regionInput);
    setArtistCount(count);
    clearError();
  };

  return (
    <div className='max-w-7xl mx-auto px-4 py-8'>
      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-slate-900 mb-2'>Statistics</h1>
        <p className='text-slate-600'>Explore data about paintings and artists</p>
      </div>

      {error && (
        <Alert variant='destructive' className='mb-8'>
          <AlertCircle className='h-4 w-4' />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
        {/* Paintings Cheaper Than */}
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <BarChart3 className='w-5 h-5' />
              Paintings Cheaper Than
            </CardTitle>
            <CardDescription>Count paintings below a specific price</CardDescription>
          </CardHeader>
          <CardContent className='space-y-6'>
            <div className='space-y-4'>
              <div>
                <label className='text-sm font-medium text-slate-700'>Max Price</label>
                <Input
                  type='number'
                  placeholder='Enter price (e.g., 50000)'
                  value={priceInput}
                  onChange={e => setPriceInput(e.target.value)}
                  className='mt-2'
                />
              </div>
              <Button
                onClick={handlePriceSearch}
                disabled={!priceInput || isFetching}
                className='w-full'
              >
                {isFetching ? (
                  <>
                    <Loader2 className='w-4 h-4 mr-2 animate-spin' />
                    Searching...
                  </>
                ) : (
                  'Search'
                )}
              </Button>
            </div>

            {searchedPrice && priceCount !== null && (
              <div className='p-6 bg-linear-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200'>
                <p className='text-sm text-blue-600 mb-2'>Result</p>
                <p className='text-4xl font-bold text-blue-900'>{priceCount}</p>
                <p className='text-sm text-blue-700 mt-2'>
                  paintings cheaper than ${Number(priceInput).toLocaleString()}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Artists by Region */}
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <BarChart3 className='w-5 h-5' />
              Artists by Region
            </CardTitle>
            <CardDescription>Count artists in a specific region</CardDescription>
          </CardHeader>
          <CardContent className='space-y-6'>
            <div className='space-y-4'>
              <div>
                <label className='text-sm font-medium text-slate-700'>Region</label>
                <Input
                  type='text'
                  placeholder='Enter region (e.g., Kyiv)'
                  value={regionInput}
                  onChange={e => setRegionInput(e.target.value)}
                  className='mt-2'
                />
              </div>
              <Button
                onClick={handleRegionSearch}
                disabled={!regionInput || isFetching}
                className='w-full'
              >
                {isFetching ? (
                  <>
                    <Loader2 className='w-4 h-4 mr-2 animate-spin' />
                    Searching...
                  </>
                ) : (
                  'Search'
                )}
              </Button>
            </div>

            {searchedRegion && artistCount !== null && (
              <div className='p-6 bg-linear-to-br from-green-50 to-green-100 rounded-lg border border-green-200'>
                <p className='text-sm text-green-600 mb-2'>Result</p>
                <p className='text-4xl font-bold text-green-900'>{artistCount}</p>
                <p className='text-sm text-green-700 mt-2'>artists from {regionInput}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Info Cards */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-8'>
        <Card>
          <CardHeader>
            <CardTitle>Paintings Cheaper Than</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-sm text-slate-600'>
              Use scalar function to count how many paintings are available below your budget.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Regional Artists</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-sm text-slate-600'>
              Discover how many artists work in different regions. Try "Kyiv", "Lviv", or "Kharkiv".
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
