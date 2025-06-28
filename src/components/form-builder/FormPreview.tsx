'use client';

import { useState } from 'react';
import { FormField } from '@/types/form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface FormPreviewProps {
  fields: FormField[];
  formTitle: string;
  formDescription: string;
}

export function FormPreview({
  fields,
  formTitle,
  formDescription,
}: FormPreviewProps) {
  const [formData, setFormData] = useState<Record<string, any>>({});

  const handleInputChange = (fieldId: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [fieldId]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Form submitted! Check console for data.');
  };

  const renderField = (field: FormField) => {
    switch (field.type) {
      case 'text':
      case 'email':
      case 'number':
        return (
          <Input
            type={field.type}
            placeholder={field.placeholder}
            required={field.required}
            value={formData[field.id] || ''}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
          />
        );

      case 'textarea':
        return (
          <textarea
            placeholder={field.placeholder}
            required={field.required}
            value={formData[field.id] || ''}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
            className='flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
          />
        );

      case 'select':
        return (
          <select
            required={field.required}
            value={formData[field.id] || ''}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
            className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2'
          >
            <option value=''>{field.placeholder || 'Select an option'}</option>
            {field.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      case 'checkbox':
        return (
          <div className='space-y-2'>
            {field.options?.map((option) => (
              <div key={option.value} className='flex items-center space-x-2'>
                <input
                  type='checkbox'
                  id={`${field.id}-${option.value}`}
                  value={option.value}
                  checked={(formData[field.id] || []).includes(option.value)}
                  onChange={(e) => {
                    const currentValues = formData[field.id] || [];
                    const newValues = e.target.checked
                      ? [...currentValues, option.value]
                      : currentValues.filter((v: string) => v !== option.value);
                    handleInputChange(field.id, newValues);
                  }}
                  className='h-4 w-4 rounded border border-primary text-primary focus:ring-2 focus:ring-primary'
                />
                <label
                  htmlFor={`${field.id}-${option.value}`}
                  className='text-sm'
                >
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        );

      case 'radio':
        return (
          <div className='space-y-2'>
            {field.options?.map((option) => (
              <div key={option.value} className='flex items-center space-x-2'>
                <input
                  type='radio'
                  id={`${field.id}-${option.value}`}
                  name={field.id}
                  value={option.value}
                  checked={formData[field.id] === option.value}
                  onChange={(e) => handleInputChange(field.id, e.target.value)}
                  className='h-4 w-4 border border-primary text-primary focus:ring-2 focus:ring-primary'
                />
                <label
                  htmlFor={`${field.id}-${option.value}`}
                  className='text-sm'
                >
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className='max-w-2xl mx-auto'>
      <Card>
        <CardHeader>
          <CardTitle>{formTitle}</CardTitle>
          {formDescription && (
            <p className='text-muted-foreground'>{formDescription}</p>
          )}
        </CardHeader>
        <CardContent>
          {fields.length === 0 ? (
            <div className='text-center text-muted-foreground py-20'>
              <p>No fields added yet</p>
              <p className='text-sm'>Switch to builder tab to add fields</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className='space-y-6'>
              {fields.map((field) => (
                <div key={field.id} className='space-y-2'>
                  <Label htmlFor={field.id}>
                    {field.label}
                    {field.required && (
                      <span className='text-red-500 ml-1'>*</span>
                    )}
                  </Label>
                  {field.description && (
                    <p className='text-sm text-muted-foreground'>
                      {field.description}
                    </p>
                  )}
                  {renderField(field)}
                </div>
              ))}
              <Button type='submit' className='w-full'>
                Submit Form
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
