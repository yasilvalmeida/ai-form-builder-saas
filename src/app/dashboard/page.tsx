'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  PlusIcon,
  EyeIcon,
  EditIcon,
  TrashIcon,
  ShareIcon,
  BarChart3Icon,
  CopyIcon,
  ExternalLinkIcon,
} from 'lucide-react';
import { Form } from '@/types/form';

export default function DashboardPage() {
  const [forms, setForms] = useState<Form[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchForms();
  }, []);

  const fetchForms = async () => {
    try {
      const response = await fetch('/api/forms');
      if (response.ok) {
        const data = await response.json();
        setForms(data);
      }
    } catch (error) {
      console.error('Error fetching forms:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteForm = async (formId: string) => {
    if (!confirm('Are you sure you want to delete this form?')) return;

    try {
      const response = await fetch(`/api/forms/${formId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setForms(forms.filter((form) => form.id !== formId));
      }
    } catch (error) {
      console.error('Error deleting form:', error);
    }
  };

  const handleCopyLink = (slug: string) => {
    const url = `${window.location.origin}/f/${slug}`;
    navigator.clipboard.writeText(url);
    alert('Form link copied to clipboard!');
  };

  const handleTogglePublish = async (formId: string, isPublished: boolean) => {
    try {
      const form = forms.find((f) => f.id === formId);
      if (!form) return;

      const response = await fetch(`/api/forms/${formId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...form,
          isPublished: !isPublished,
        }),
      });

      if (response.ok) {
        setForms(
          forms.map((f) =>
            f.id === formId ? { ...f, isPublished: !isPublished } : f
          )
        );
      }
    } catch (error) {
      console.error('Error updating form:', error);
    }
  };

  if (loading) {
    return (
      <div className='min-h-screen bg-background'>
        <div className='container mx-auto px-4 py-8'>
          <div className='flex items-center justify-center py-20'>
            <p>Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-background'>
      {/* Header */}
      <header className='border-b'>
        <div className='container mx-auto px-4 py-4'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center space-x-4'>
              <Link href='/' className='text-2xl font-bold'>
                AI Form Builder
              </Link>
              <Badge variant='secondary'>Dashboard</Badge>
            </div>
            <Link href='/forms/new'>
              <Button>
                <PlusIcon className='h-4 w-4 mr-2' />
                New Form
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className='container mx-auto px-4 py-8'>
        <div className='mb-8'>
          <h1 className='text-3xl font-bold mb-2'>Your Forms</h1>
          <p className='text-muted-foreground'>
            Manage your forms and view responses
          </p>
        </div>

        {forms.length === 0 ? (
          <div className='text-center py-20'>
            <div className='mb-4'>
              <BarChart3Icon className='h-16 w-16 mx-auto text-muted-foreground' />
            </div>
            <h2 className='text-2xl font-semibold mb-2'>No forms yet</h2>
            <p className='text-muted-foreground mb-6'>
              Create your first form to get started
            </p>
            <Link href='/forms/new'>
              <Button size='lg'>
                <PlusIcon className='h-5 w-5 mr-2' />
                Create Your First Form
              </Button>
            </Link>
          </div>
        ) : (
          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {forms.map((form) => (
              <Card key={form.id} className='hover:shadow-lg transition-shadow'>
                <CardHeader>
                  <div className='flex items-start justify-between'>
                    <div className='flex-1'>
                      <CardTitle className='text-lg mb-1'>
                        {form.title}
                      </CardTitle>
                      <CardDescription className='line-clamp-2'>
                        {form.description || 'No description'}
                      </CardDescription>
                    </div>
                    <Badge variant={form.isPublished ? 'default' : 'secondary'}>
                      {form.isPublished ? 'Published' : 'Draft'}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className='space-y-2 text-sm text-muted-foreground'>
                    <p>{form.fields.length} fields</p>
                    <p>
                      Created {new Date(form.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </CardContent>

                <CardFooter className='flex items-center justify-between'>
                  <div className='flex items-center space-x-1'>
                    <Link href={`/forms/${form.id}`}>
                      <Button size='sm' variant='ghost'>
                        <EditIcon className='h-3 w-3' />
                      </Button>
                    </Link>
                    <Link href={`/forms/${form.id}/responses`}>
                      <Button size='sm' variant='ghost'>
                        <BarChart3Icon className='h-3 w-3' />
                      </Button>
                    </Link>
                    {form.isPublished && (
                      <>
                        <Button
                          size='sm'
                          variant='ghost'
                          onClick={() => handleCopyLink(form.slug)}
                        >
                          <CopyIcon className='h-3 w-3' />
                        </Button>
                        <Link href={`/f/${form.slug}`} target='_blank'>
                          <Button size='sm' variant='ghost'>
                            <ExternalLinkIcon className='h-3 w-3' />
                          </Button>
                        </Link>
                      </>
                    )}
                  </div>

                  <div className='flex items-center space-x-1'>
                    <Button
                      size='sm'
                      variant='outline'
                      onClick={() =>
                        handleTogglePublish(form.id, form.isPublished)
                      }
                    >
                      {form.isPublished ? 'Unpublish' : 'Publish'}
                    </Button>
                    <Button
                      size='sm'
                      variant='ghost'
                      onClick={() => handleDeleteForm(form.id)}
                    >
                      <TrashIcon className='h-3 w-3' />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
