'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { FormField } from '@/types/form';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { GripVerticalIcon, TrashIcon, EditIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SortableFieldProps {
  field: FormField;
  isSelected: boolean;
  onSelect: () => void;
  onDelete: () => void;
}

export function SortableField({
  field,
  isSelected,
  onSelect,
  onDelete,
}: SortableFieldProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: field.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const renderFieldPreview = () => {
    switch (field.type) {
      case 'text':
      case 'email':
      case 'number':
        return (
          <Input
            placeholder={field.placeholder}
            disabled
            className='pointer-events-none'
          />
        );
      case 'textarea':
        return (
          <textarea
            placeholder={field.placeholder}
            disabled
            className='flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pointer-events-none'
          />
        );
      case 'select':
        return (
          <select
            disabled
            title={field.label}
            className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pointer-events-none'
          >
            <option>{field.placeholder || 'Select an option'}</option>
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
                  disabled
                  title={option.label}
                  className='h-4 w-4 rounded border border-primary text-primary focus:ring-2 focus:ring-primary pointer-events-none'
                />
                <label className='text-sm'>{option.label}</label>
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
                  name={field.id}
                  disabled
                  title={option.label}
                  className='h-4 w-4 border border-primary text-primary focus:ring-2 focus:ring-primary pointer-events-none'
                />
                <label className='text-sm'>{option.label}</label>
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div ref={setNodeRef} style={style}>
      <Card
        className={cn(
          'cursor-pointer transition-all hover:shadow-md',
          isSelected && 'ring-2 ring-primary'
        )}
        onClick={onSelect}
      >
        <CardContent className='p-4'>
          <div className='flex items-start justify-between mb-3'>
            <div className='flex items-center space-x-2'>
              <div
                {...attributes}
                {...listeners}
                className='cursor-grab active:cursor-grabbing p-1 hover:bg-muted rounded'
              >
                <GripVerticalIcon className='h-4 w-4 text-muted-foreground' />
              </div>
              <div>
                <Label className='text-sm font-medium'>
                  {field.label}
                  {field.required && (
                    <span className='text-red-500 ml-1'>*</span>
                  )}
                </Label>
                {field.description && (
                  <p className='text-xs text-muted-foreground mt-1'>
                    {field.description}
                  </p>
                )}
              </div>
            </div>
            <div className='flex items-center space-x-1'>
              <Button
                size='sm'
                variant='ghost'
                onClick={(e) => {
                  e.stopPropagation();
                  onSelect();
                }}
              >
                <EditIcon className='h-3 w-3' />
              </Button>
              <Button
                size='sm'
                variant='ghost'
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete();
                }}
              >
                <TrashIcon className='h-3 w-3' />
              </Button>
            </div>
          </div>

          <div className='space-y-2'>{renderFieldPreview()}</div>
        </CardContent>
      </Card>
    </div>
  );
}
