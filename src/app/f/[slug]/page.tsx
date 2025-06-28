import { notFound } from 'next/navigation';
import { db } from '@/lib/db';
import { PublicForm } from '@/components/PublicForm';

interface PublicFormPageProps {
  params: {
    slug: string;
  };
}

export default async function PublicFormPage({ params }: PublicFormPageProps) {
  const form = await db.form.findUnique({
    where: {
      slug: params.slug,
      isPublished: true,
    },
  });

  if (!form) {
    notFound();
  }

  const formWithFields = {
    ...form,
    fields: JSON.parse(form.fields),
  };

  return <PublicForm form={formWithFields} />;
}
