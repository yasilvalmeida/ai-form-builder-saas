import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { FormField } from '@/types/form';
import { v4 as uuidv4 } from 'uuid';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { title, description, existingFields } = await req.json();

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      );
    }

    const prompt = `
Generate form fields for a form titled "${title}"${
      description ? ` with description: "${description}"` : ''
    }.

${
  existingFields.length > 0
    ? `Existing fields: ${existingFields
        .map((f: FormField) => f.label)
        .join(', ')}`
    : ''
}

Generate 3-5 relevant form fields that would make sense for this form. For each field, provide:
- A descriptive label
- Appropriate field type (text, email, number, select, checkbox, textarea, radio)
- Helpful placeholder text
- Whether it should be required
- A brief description/help text
- For select/radio/checkbox fields, provide 3-4 realistic options

Return a JSON array of fields with this structure:
{
  "type": "text|email|number|select|checkbox|textarea|radio",
  "label": "Field Label",
  "placeholder": "Placeholder text",
  "required": true|false,
  "description": "Help text",
  "options": [{"label": "Option 1", "value": "option1"}] // only for select/radio/checkbox
}

Make the fields practical and relevant to the form purpose.
`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const content = completion.choices[0].message.content;
    if (!content) {
      throw new Error('No content received from OpenAI');
    }

    // Parse the JSON response
    let fieldsData;
    try {
      fieldsData = JSON.parse(content);
    } catch (parseError) {
      // If JSON parsing fails, try to extract JSON from the response
      const jsonMatch = content.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        fieldsData = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('Could not parse AI response as JSON');
      }
    }

    // Add IDs to the fields
    const fields: FormField[] = fieldsData.map((field: any) => ({
      id: uuidv4(),
      ...field,
    }));

    return NextResponse.json({ fields });
  } catch (error) {
    console.error('Error generating AI fields:', error);
    return NextResponse.json(
      { error: 'Failed to generate AI fields' },
      { status: 500 }
    );
  }
}
