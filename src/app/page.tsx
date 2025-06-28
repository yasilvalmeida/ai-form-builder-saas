import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  PlusIcon,
  FileTextIcon,
  BarChart3Icon,
  ShareIcon,
  SparklesIcon,
} from 'lucide-react';

export default function HomePage() {
  return (
    <div className='min-h-screen'>
      {/* Header */}
      <header className='border-b'>
        <div className='container mx-auto px-4 py-4'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center space-x-2'>
              <FileTextIcon className='h-8 w-8 text-primary' />
              <h1 className='text-2xl font-bold'>AI Form Builder</h1>
            </div>
            <nav className='flex items-center space-x-4'>
              <Link href='/dashboard'>
                <Button variant='ghost'>Dashboard</Button>
              </Link>
              <Link href='/forms/new'>
                <Button>
                  <PlusIcon className='h-4 w-4 mr-2' />
                  New Form
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className='py-20 px-4'>
        <div className='container mx-auto text-center'>
          <h2 className='text-5xl font-bold mb-6'>
            Create Beautiful Forms with{' '}
            <span className='text-primary'>AI Power</span>
          </h2>
          <p className='text-xl text-muted-foreground mb-8 max-w-2xl mx-auto'>
            Drag and drop form builder with AI-generated labels, validations,
            and descriptions. Share your forms instantly and track responses.
          </p>
          <div className='flex items-center justify-center space-x-4'>
            <Link href='/forms/new'>
              <Button size='lg'>
                <PlusIcon className='h-5 w-5 mr-2' />
                Create Your First Form
              </Button>
            </Link>
            <Link href='/dashboard'>
              <Button variant='outline' size='lg'>
                View Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className='py-16 px-4 bg-muted/50'>
        <div className='container mx-auto'>
          <h3 className='text-3xl font-bold text-center mb-12'>
            Everything you need to build amazing forms
          </h3>
          <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6'>
            <Card>
              <CardHeader>
                <FileTextIcon className='h-8 w-8 text-primary mb-2' />
                <CardTitle>Drag & Drop Builder</CardTitle>
                <CardDescription>
                  Intuitive interface to build forms without coding
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <SparklesIcon className='h-8 w-8 text-primary mb-2' />
                <CardTitle>AI-Powered</CardTitle>
                <CardDescription>
                  Auto-generate labels, validations, and descriptions
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <ShareIcon className='h-8 w-8 text-primary mb-2' />
                <CardTitle>Instant Sharing</CardTitle>
                <CardDescription>
                  Get shareable links to collect responses immediately
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <BarChart3Icon className='h-8 w-8 text-primary mb-2' />
                <CardTitle>Response Analytics</CardTitle>
                <CardDescription>
                  Track and analyze form responses in real-time
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className='border-t py-8 px-4'>
        <div className='container mx-auto text-center text-muted-foreground'>
          <p>&copy; 2024 AI Form Builder. Built with Next.js and AI.</p>
        </div>
      </footer>
    </div>
  );
}
