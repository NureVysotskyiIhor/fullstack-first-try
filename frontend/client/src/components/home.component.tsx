import { Link } from '@tanstack/react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Palette, Search, BarChart3, ShoppingCart } from 'lucide-react';

export const Home = () => {
  return (
    <div className='max-w-7xl mx-auto px-4 py-16'>
      <div className='text-center mb-16'>
        <h1 className='text-5xl font-bold text-slate-900 mb-4'>Welcome to ArtGallery</h1>
        <p className='text-xl text-slate-600'>Discover, manage, and sell paintings with ease</p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12'>
        <Card>
          <CardHeader className='text-center'>
            <div className='flex justify-center mb-4'>
              <Search className='w-8 h-8 text-blue-600' />
            </div>
            <CardTitle>Find Paintings</CardTitle>
          </CardHeader>
          <CardContent className='text-center'>
            <p className='text-sm text-slate-600 mb-4'>Search paintings within your budget</p>
            <Link to='/paintings'>
              <Button variant='outline' className='w-full'>
                Browse Paintings
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='text-center'>
            <div className='flex justify-center mb-4'>
              <BarChart3 className='w-8 h-8 text-green-600' />
            </div>
            <CardTitle>Statistics</CardTitle>
          </CardHeader>
          <CardContent className='text-center'>
            <p className='text-sm text-slate-600 mb-4'>Explore data about paintings and artists</p>
            <Link to='/statistics'>
              <Button variant='outline' className='w-full'>
                View Stats
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='text-center'>
            <div className='flex justify-center mb-4'>
              <ShoppingCart className='w-8 h-8 text-purple-600' />
            </div>
            <CardTitle>Sales</CardTitle>
          </CardHeader>
          <CardContent className='text-center'>
            <p className='text-sm text-slate-600 mb-4'>Register and manage sales</p>
            <Link to='/sales'>
              <Button variant='outline' className='w-full'>
                Manage Sales
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='text-center'>
            <div className='flex justify-center mb-4'>
              <Palette className='w-8 h-8 text-pink-600' />
            </div>
            <CardTitle>Galleries</CardTitle>
          </CardHeader>
          <CardContent className='text-center'>
            <p className='text-sm text-slate-600 mb-4'>Create and manage galleries</p>
            <Link to='/sales'>
              <Button variant='outline' className='w-full'>
                Go to Galleries
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <Card className='bg-linear-to-r from-blue-50 to-blue-100 border-blue-200'>
        <CardHeader>
          <CardTitle className='text-2xl'>Getting Started</CardTitle>
          <CardDescription className='text-base'>
            Choose a section to begin exploring
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-3'>
          <p className='text-slate-700'>
            • <strong>Paintings:</strong> Search for paintings by price and view detailed
            information
          </p>
          <p className='text-slate-700'>
            • <strong>Statistics:</strong> Get insights about paintings and artists by region
          </p>
          <p className='text-slate-700'>
            • <strong>Sales & Galleries:</strong> Register sales, create galleries, and mark
            paintings
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
