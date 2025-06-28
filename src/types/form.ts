export interface FormField {
  id: string;
  type:
    | 'text'
    | 'email'
    | 'number'
    | 'select'
    | 'checkbox'
    | 'textarea'
    | 'radio';
  label: string;
  placeholder?: string;
  required: boolean;
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
    message?: string;
  };
  options?: { label: string; value: string }[]; // For select, radio, checkbox
  description?: string;
}

export interface Form {
  id: string;
  title: string;
  description?: string;
  slug: string;
  fields: FormField[];
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface FormResponse {
  id: string;
  formId: string;
  data: Record<string, any>;
  createdAt: Date;
}

export interface DragItem {
  id: string;
  type: 'field';
  fieldType: FormField['type'];
}
