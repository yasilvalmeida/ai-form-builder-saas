'use client';

import { useDraggable } from '@dnd-kit/core';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  TypeIcon,
  MailIcon,
  HashIcon,
  ListIcon,
  CheckSquareIcon,
  AlignLeftIcon,
  CircleDotIcon,
} from 'lucide-react';
import { FormField } from '@/types/form';

const fieldTypes: Array<{
  type: FormField['type'];
  label: string;
  icon: React.ElementType;
  description: string;
}> = [
  {
    type: 'text',
    label: 'Text Input',
    icon: TypeIcon,
    description: 'Single line text field',
  },
  {
    type: 'email',
    label: 'Email',
    icon: MailIcon,
    description: 'Email address field',
  },
  {
    type: 'number',
    label: 'Number',
    icon: HashIcon,
    description: 'Numeric input field',
  },
  {
    type: 'select',
    label: 'Select',
    icon: ListIcon,
    description: 'Dropdown selection',
  },
  {
    type: 'checkbox',
    label: 'Checkbox',
    icon: CheckSquareIcon,
    description: 'Multiple choice options',
  },
  {
    type: 'textarea',
    label: 'Text Area',
    icon: AlignLeftIcon,
    description: 'Multi-line text field',
  },
  {
    type: 'radio',
    label: 'Radio Button',
    icon: CircleDotIcon,
    description: 'Single choice options',
  },
];

interface DraggableFieldProps {
  type: FormField['type'];
  label: string;
  icon: React.ElementType;
  description: string;
}

function DraggableField({
  type,
  label,
  icon: Icon,
  description,
}: DraggableFieldProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: `field-${type}`,
      data: {
        type: 'field',
        fieldType: type,
      },
    });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        opacity: isDragging ? 0.5 : 1,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className='cursor-grab active:cursor-grabbing'
    >
      <Card className='hover:shadow-md transition-shadow'>
        <CardContent className='p-4'>
          <div className='flex items-center space-x-3'>
            <Icon className='h-5 w-5 text-primary' />
            <div>
              <h4 className='font-medium'>{label}</h4>
              <p className='text-sm text-muted-foreground'>{description}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function FieldSidebar() {
  return (
    <div className='space-y-4'>
      <div>
        <h3 className='font-semibold mb-4'>Form Fields</h3>
        <p className='text-sm text-muted-foreground mb-4'>
          Drag and drop fields to build your form
        </p>
      </div>

      <div className='space-y-3'>
        {fieldTypes.map((fieldType) => (
          <DraggableField key={fieldType.type} {...fieldType} />
        ))}
      </div>
    </div>
  );
}
