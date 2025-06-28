import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const { formId, data } = await req.json();

    if (!formId || !data) {
      return NextResponse.json(
        { error: 'Form ID and data are required' },
        { status: 400 }
      );
    }

    // Verify that the form exists and is published
    const form = await db.form.findUnique({
      where: {
        id: formId,
        isPublished: true,
      },
    });

    if (!form) {
      return NextResponse.json(
        { error: 'Form not found or not published' },
        { status: 404 }
      );
    }

    const response = await db.response.create({
      data: {
        formId,
        data: JSON.stringify(data),
      },
    });

    return NextResponse.json({
      id: response.id,
      message: 'Response saved successfully',
    });
  } catch (error) {
    console.error('Error saving response:', error);
    return NextResponse.json(
      { error: 'Failed to save response' },
      { status: 500 }
    );
  }
}
