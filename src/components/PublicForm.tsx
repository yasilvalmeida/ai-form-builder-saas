'use client';

import { useState } from 'react';
import { Form, FormField } from '@/types/form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CheckCircleIcon } from 'lucide-react';

interface PublicFormProps {
  form: Form;
}

export function PublicForm({ form }: PublicFormProps) {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (fieldId: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [fieldId]: value,
    }));
    // Clear error when user starts typing
    if (errors[fieldId]) {
      setErrors((prev) => ({ ...prev, [fieldId]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    form.fields.forEach((field) => {
      if (field.required) {
        const value = formData[field.id];
        if (!value || (Array.isArray(value) && value.length === 0)) {
          newErrors[field.id] = 'This field is required';
        }
      }

      // Additional validation for email fields
      if (field.type === 'email' && formData[field.id]) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData[field.id])) {
          newErrors[field.id] = 'Please enter a valid email address';
        }
      }

      // Number validation
      if (field.type === 'number' && formData[field.id]) {
        const num = Number(formData[field.id]);
        if (isNaN(num)) {
          newErrors[field.id] = 'Please enter a valid number';
        } else {
          if (
            field.validation?.min !== undefined &&
            num < field.validation.min
          ) {
            newErrors[field.id] = `Minimum value is ${field.validation.min}`;
          }
          if (
            field.validation?.max !== undefined &&
            num > field.validation.max
          ) {
            newErrors[field.id] = `Maximum value is ${field.validation.max}`;
          }
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch('/api/responses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formId: form.id,
          data: formData,
        }),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        alert('Failed to submit form. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to submit form. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const renderField = (field: FormField) => {
    const hasError = !!errors[field.id];

    switch (field.type) {
      case 'text':
      case 'email':
      case 'number':
        return (
          <Input
            type={field.type}
            placeholder={field.placeholder}
            value={formData[field.id] || ''}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
            className={hasError ? 'border-red-500' : ''}
          />
        );

      case 'textarea':
        return (
          <textarea
            placeholder={field.placeholder}
            value={formData[field.id] || ''}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
            className={`flex min-h-[80px] w-full rounded-md border px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
              hasError ? 'border-red-500' : 'border-input bg-background'
            }`}
          />
        );

      case 'select':
        return (
          <select
            value={formData[field.id] || ''}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
            title={field.label}
            className={`flex h-10 w-full rounded-md border px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${
              hasError ? 'border-red-500' : 'border-input bg-background'
            }`}
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

  if (submitted) {
    return (
      <div className='min-h-screen bg-background flex items-center justify-center'>
        <Card className='max-w-md w-full mx-4'>
          <CardContent className='pt-6'>
            <div className='text-center'>
              <CheckCircleIcon className='h-16 w-16 text-green-500 mx-auto mb-4' />
              <h2 className='text-2xl font-semibold mb-2'>Thank you!</h2>
              <p className='text-muted-foreground'>
                Your response has been submitted successfully.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-background py-8'>
      <div className='container mx-auto px-4'>
        <div className='max-w-2xl mx-auto'>
          <Card>
            <CardHeader>
              <CardTitle className='text-2xl'>{form.title}</CardTitle>
              {form.description && (
                <p className='text-muted-foreground'>{form.description}</p>
              )}
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className='space-y-6'>
                {form.fields.map((field) => (
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
                    {errors[field.id] && (
                      <p className='text-sm text-red-500'>{errors[field.id]}</p>
                    )}
                  </div>
                ))}
                <Button type='submit' className='w-full' disabled={submitting}>
                  {submitting ? 'Submitting...' : 'Submit'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
