'use client';

import { useState } from 'react';
import { useDroppable } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { FormField } from '@/types/form';
import { FieldSidebar } from './FieldSidebar';
import { SortableField } from './SortableField';
import { FieldEditor } from './FieldEditor';
import { Button } from '@/components/ui/button';
import { SparklesIcon } from 'lucide-react';

interface FormBuilderProps {
  fields: FormField[];
  onFieldsChange: (fields: FormField[]) => void;
  formTitle: string;
  formDescription: string;
}

export function FormBuilder({
  fields,
  onFieldsChange,
  formTitle,
  formDescription,
}: FormBuilderProps) {
  const [selectedField, setSelectedField] = useState<FormField | null>(null);
  const [generatingAI, setGeneratingAI] = useState(false);

  const { setNodeRef } = useDroppable({
    id: 'form-builder',
  });

  const handleFieldUpdate = (updatedField: FormField) => {
    onFieldsChange(
      fields.map((field) =>
        field.id === updatedField.id ? updatedField : field
      )
    );
    setSelectedField(updatedField);
  };

  const handleFieldDelete = (fieldId: string) => {
    onFieldsChange(fields.filter((field) => field.id !== fieldId));
    setSelectedField(null);
  };

  const handleGenerateAIFields = async () => {
    if (!formTitle.trim()) {
      alert('Please enter a form title first');
      return;
    }

    setGeneratingAI(true);
    try {
      const response = await fetch('/api/ai/generate-fields', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formTitle,
          description: formDescription,
          existingFields: fields,
        }),
      });

      if (response.ok) {
        const { fields: aiFields } = await response.json();
        onFieldsChange([...fields, ...aiFields]);
      } else {
        alert('Failed to generate AI fields');
      }
    } catch (error) {
      console.error('Error generating AI fields:', error);
      alert('Failed to generate AI fields');
    } finally {
      setGeneratingAI(false);
    }
  };

  return (
    <div className='grid grid-cols-12 gap-8'>
      {/* Field Sidebar */}
      <div className='col-span-3'>
        <FieldSidebar />
        <div className='mt-6'>
          <Button
            onClick={handleGenerateAIFields}
            disabled={generatingAI}
            className='w-full'
            variant='outline'
          >
            <SparklesIcon className='h-4 w-4 mr-2' />
            {generatingAI ? 'Generating...' : 'Generate AI Fields'}
          </Button>
        </div>
      </div>

      {/* Form Builder Area */}
      <div className='col-span-6'>
        <div
          ref={setNodeRef}
          className='min-h-[500px] border-2 border-dashed border-muted-foreground/25 rounded-lg p-6'
        >
          {fields.length === 0 ? (
            <div className='text-center text-muted-foreground py-20'>
              <p className='text-lg mb-2'>Start building your form</p>
              <p className='text-sm'>
                Drag fields from the sidebar to add them to your form
              </p>
            </div>
          ) : (
            <SortableContext
              items={fields.map((f) => f.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className='space-y-4'>
                {fields.map((field) => (
                  <SortableField
                    key={field.id}
                    field={field}
                    isSelected={selectedField?.id === field.id}
                    onSelect={() => setSelectedField(field)}
                    onDelete={() => handleFieldDelete(field.id)}
                  />
                ))}
              </div>
            </SortableContext>
          )}
        </div>
      </div>

      {/* Field Editor */}
      <div className='col-span-3'>
        {selectedField ? (
          <FieldEditor
            field={selectedField}
            onUpdate={handleFieldUpdate}
            onClose={() => setSelectedField(null)}
          />
        ) : (
          <div className='text-center text-muted-foreground py-20'>
            <p>Select a field to edit its properties</p>
          </div>
        )}
      </div>
    </div>
  );
}
