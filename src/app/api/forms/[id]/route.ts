import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const form = await db.form.findUnique({
      where: {
        id: params.id,
      },
      include: {
        responses: true,
      },
    });

    if (!form) {
      return NextResponse.json({ error: 'Form not found' }, { status: 404 });
    }

    return NextResponse.json({
      ...form,
      fields: JSON.parse(form.fields),
      responses: form.responses.map((response) => ({
        ...response,
        data: JSON.parse(response.data),
      })),
    });
  } catch (error) {
    console.error('Error fetching form:', error);
    return NextResponse.json(
      { error: 'Failed to fetch form' },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { title, description, fields, isPublished } = await req.json();

    const form = await db.form.update({
      where: {
        id: params.id,
      },
      data: {
        title,
        description,
        fields: JSON.stringify(fields),
        isPublished,
      },
    });

    return NextResponse.json({
      ...form,
      fields: JSON.parse(form.fields),
    });
  } catch (error) {
    console.error('Error updating form:', error);
    return NextResponse.json(
      { error: 'Failed to update form' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await db.form.delete({
      where: {
        id: params.id,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting form:', error);
    return NextResponse.json(
      { error: 'Failed to delete form' },
      { status: 500 }
    );
  }
}
