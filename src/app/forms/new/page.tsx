'use client';

import { useState } from 'react';
import { DndContext, DragEndEvent, closestCenter } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { FormBuilder } from '@/components/form-builder/FormBuilder';
import { FormPreview } from '@/components/form-builder/FormPreview';
import { FormField } from '@/types/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SaveIcon, EyeIcon, ShareIcon } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/navigation';

export default function NewFormPage() {
  const [formTitle, setFormTitle] = useState('Untitled Form');
  const [formDescription, setFormDescription] = useState('');
  const [fields, setFields] = useState<FormField[]>([]);
  const [activeTab, setActiveTab] = useState<'builder' | 'preview'>('builder');
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    if (active.data.current?.type === 'field') {
      // Adding new field from sidebar
      const fieldType = active.data.current.fieldType;
      const newField: FormField = {
        id: uuidv4(),
        type: fieldType,
        label: getDefaultLabel(fieldType),
        placeholder: getDefaultPlaceholder(fieldType),
        required: false,
        description: '',
      };
      setFields((prev) => [...prev, newField]);
    }
  };

  const getDefaultLabel = (type: FormField['type']): string => {
    const labels = {
      text: 'Text Field',
      email: 'Email Address',
      number: 'Number',
      select: 'Select Option',
      checkbox: 'Checkbox',
      textarea: 'Text Area',
      radio: 'Radio Button',
    };
    return labels[type] || 'Field';
  };

  const getDefaultPlaceholder = (type: FormField['type']): string => {
    const placeholders = {
      text: 'Enter text...',
      email: 'Enter email address...',
      number: 'Enter number...',
      select: 'Select an option...',
      checkbox: '',
      textarea: 'Enter your message...',
      radio: '',
    };
    return placeholders[type] || '';
  };

  const handleSaveForm = async () => {
    if (!formTitle.trim()) {
      alert('Please enter a form title');
      return;
    }

    setSaving(true);
    try {
      const response = await fetch('/api/forms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formTitle,
          description: formDescription,
          fields: fields,
        }),
      });

      if (response.ok) {
        const form = await response.json();
        router.push(`/forms/${form.id}`);
      } else {
        alert('Failed to save form');
      }
    } catch (error) {
      console.error('Error saving form:', error);
      alert('Failed to save form');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className='min-h-screen bg-background'>
      {/* Header */}
      <header className='border-b'>
        <div className='container mx-auto px-4 py-4'>
          <div className='flex items-center justify-between'>
            <div className='flex-1 max-w-md'>
              <Input
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
                className='text-lg font-semibold border-none shadow-none'
                placeholder='Form Title'
              />
            </div>
            <div className='flex items-center space-x-4'>
              <div className='flex border rounded-lg'>
                <Button
                  variant={activeTab === 'builder' ? 'default' : 'ghost'}
                  size='sm'
                  onClick={() => setActiveTab('builder')}
                >
                  Builder
                </Button>
                <Button
                  variant={activeTab === 'preview' ? 'default' : 'ghost'}
                  size='sm'
                  onClick={() => setActiveTab('preview')}
                >
                  <EyeIcon className='h-4 w-4 mr-2' />
                  Preview
                </Button>
              </div>
              <Button onClick={handleSaveForm} disabled={saving}>
                <SaveIcon className='h-4 w-4 mr-2' />
                {saving ? 'Saving...' : 'Save Form'}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className='container mx-auto px-4 py-8'>
        <div className='mb-6'>
          <Label htmlFor='description'>Form Description</Label>
          <Input
            id='description'
            value={formDescription}
            onChange={(e) => setFormDescription(e.target.value)}
            placeholder='Describe your form...'
            className='mt-2'
          />
        </div>

        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          {activeTab === 'builder' ? (
            <FormBuilder
              fields={fields}
              onFieldsChange={setFields}
              formTitle={formTitle}
              formDescription={formDescription}
            />
          ) : (
            <FormPreview
              fields={fields}
              formTitle={formTitle}
              formDescription={formDescription}
            />
          )}
        </DndContext>
      </div>
    </div>
  );
}
