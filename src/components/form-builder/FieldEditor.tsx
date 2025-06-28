'use client';

import { useState } from 'react';
import { FormField } from '@/types/form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { XIcon, PlusIcon, TrashIcon, SparklesIcon } from 'lucide-react';

interface FieldEditorProps {
  field: FormField;
  onUpdate: (field: FormField) => void;
  onClose: () => void;
}

export function FieldEditor({ field, onUpdate, onClose }: FieldEditorProps) {
  const [editingField, setEditingField] = useState<FormField>(field);
  const [generatingLabel, setGeneratingLabel] = useState(false);

  const handleUpdate = (updates: Partial<FormField>) => {
    const updatedField = { ...editingField, ...updates };
    setEditingField(updatedField);
    onUpdate(updatedField);
  };

  const handleAddOption = () => {
    const options = editingField.options || [];
    const newOption = {
      label: 'New Option',
      value: `option_${options.length + 1}`,
    };
    handleUpdate({ options: [...options, newOption] });
  };

  const handleUpdateOption = (
    index: number,
    updates: { label?: string; value?: string }
  ) => {
    const options = [...(editingField.options || [])];
    options[index] = { ...options[index], ...updates };
    handleUpdate({ options });
  };

  const handleRemoveOption = (index: number) => {
    const options = [...(editingField.options || [])];
    options.splice(index, 1);
    handleUpdate({ options });
  };

  const handleGenerateAILabel = async () => {
    setGeneratingLabel(true);
    try {
      const response = await fetch('/api/ai/enhance-field', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          field: editingField,
          type: 'label',
        }),
      });

      if (response.ok) {
        const { label, placeholder, description } = await response.json();
        handleUpdate({ label, placeholder, description });
      }
    } catch (error) {
      console.error('Error generating AI label:', error);
    } finally {
      setGeneratingLabel(false);
    }
  };

  const needsOptions = ['select', 'checkbox', 'radio'].includes(
    editingField.type
  );

  return (
    <Card className='w-full'>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
        <CardTitle className='text-lg'>Field Properties</CardTitle>
        <Button variant='ghost' size='sm' onClick={onClose}>
          <XIcon className='h-4 w-4' />
        </Button>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div className='space-y-2'>
          <div className='flex items-center justify-between'>
            <Label htmlFor='label'>Label</Label>
            <Button
              size='sm'
              variant='outline'
              onClick={handleGenerateAILabel}
              disabled={generatingLabel}
            >
              <SparklesIcon className='h-3 w-3 mr-1' />
              {generatingLabel ? 'AI...' : 'AI'}
            </Button>
          </div>
          <Input
            id='label'
            value={editingField.label}
            onChange={(e) => handleUpdate({ label: e.target.value })}
          />
        </div>

        <div className='space-y-2'>
          <Label htmlFor='placeholder'>Placeholder</Label>
          <Input
            id='placeholder'
            value={editingField.placeholder || ''}
            onChange={(e) => handleUpdate({ placeholder: e.target.value })}
          />
        </div>

        <div className='space-y-2'>
          <Label htmlFor='description'>Description</Label>
          <Input
            id='description'
            value={editingField.description || ''}
            onChange={(e) => handleUpdate({ description: e.target.value })}
            placeholder='Help text for this field'
          />
        </div>

        <div className='flex items-center space-x-2'>
          <Switch
            id='required'
            checked={editingField.required}
            onCheckedChange={(checked) => handleUpdate({ required: checked })}
          />
          <Label htmlFor='required'>Required field</Label>
        </div>

        {needsOptions && (
          <div className='space-y-3'>
            <div className='flex items-center justify-between'>
              <Label>Options</Label>
              <Button size='sm' variant='outline' onClick={handleAddOption}>
                <PlusIcon className='h-3 w-3 mr-1' />
                Add Option
              </Button>
            </div>
            <div className='space-y-2'>
              {editingField.options?.map((option, index) => (
                <div key={index} className='flex items-center space-x-2'>
                  <Input
                    value={option.label}
                    onChange={(e) =>
                      handleUpdateOption(index, { label: e.target.value })
                    }
                    placeholder='Option label'
                    className='flex-1'
                  />
                  <Input
                    value={option.value}
                    onChange={(e) =>
                      handleUpdateOption(index, { value: e.target.value })
                    }
                    placeholder='Option value'
                    className='flex-1'
                  />
                  <Button
                    size='sm'
                    variant='ghost'
                    onClick={() => handleRemoveOption(index)}
                  >
                    <TrashIcon className='h-3 w-3' />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {(editingField.type === 'text' || editingField.type === 'number') && (
          <div className='space-y-3'>
            <Label>Validation</Label>
            <div className='grid grid-cols-2 gap-2'>
              <div className='space-y-1'>
                <Label htmlFor='min'>Min</Label>
                <Input
                  id='min'
                  type='number'
                  value={editingField.validation?.min || ''}
                  onChange={(e) =>
                    handleUpdate({
                      validation: {
                        ...editingField.validation,
                        min: parseInt(e.target.value) || undefined,
                      },
                    })
                  }
                />
              </div>
              <div className='space-y-1'>
                <Label htmlFor='max'>Max</Label>
                <Input
                  id='max'
                  type='number'
                  value={editingField.validation?.max || ''}
                  onChange={(e) =>
                    handleUpdate({
                      validation: {
                        ...editingField.validation,
                        max: parseInt(e.target.value) || undefined,
                      },
                    })
                  }
                />
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
