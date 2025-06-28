import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { generateSlug } from '@/lib/utils';
import { v4 as uuidv4 } from 'uuid';

export async function GET() {
  try {
    const forms = await db.form.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    const formattedForms = forms.map((form) => ({
      ...form,
      fields: JSON.parse(form.fields),
    }));

    return NextResponse.json(formattedForms);
  } catch (error) {
    console.error('Error fetching forms:', error);
    return NextResponse.json(
      { error: 'Failed to fetch forms' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { title, description, fields } = await req.json();

    if (!title || !fields) {
      return NextResponse.json(
        { error: 'Title and fields are required' },
        { status: 400 }
      );
    }

    const slug = generateSlug(title) + '-' + uuidv4().slice(0, 8);

    const form = await db.form.create({
      data: {
        title,
        description,
        slug,
        fields: JSON.stringify(fields),
        isPublished: false,
      },
    });

    return NextResponse.json({
      ...form,
      fields: JSON.parse(form.fields),
    });
  } catch (error) {
    console.error('Error creating form:', error);
    return NextResponse.json(
      { error: 'Failed to create form' },
      { status: 500 }
    );
  }
}
