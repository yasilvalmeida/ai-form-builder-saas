import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { field, type } = await req.json();

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      );
    }

    const prompt = `
Enhance this form field with better content:

Current field:
- Type: ${field.type}
- Label: ${field.label}
- Placeholder: ${field.placeholder || 'none'}
- Description: ${field.description || 'none'}

Please provide improved versions for:
- A clear, user-friendly label
- Helpful placeholder text (if applicable for this field type)
- A brief, helpful description to guide users

Return a JSON object with these properties:
{
  "label": "Improved label",
  "placeholder": "Improved placeholder (or empty string if not applicable)",
  "description": "Brief helpful description"
}

Make the content natural, clear, and user-friendly.
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
      max_tokens: 200,
    });

    const content = completion.choices[0].message.content;
    if (!content) {
      throw new Error('No content received from OpenAI');
    }

    // Parse the JSON response
    let enhancement;
    try {
      enhancement = JSON.parse(content);
    } catch (parseError) {
      // If JSON parsing fails, try to extract JSON from the response
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        enhancement = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('Could not parse AI response as JSON');
      }
    }

    return NextResponse.json(enhancement);
  } catch (error) {
    console.error('Error enhancing field:', error);
    return NextResponse.json(
      { error: 'Failed to enhance field' },
      { status: 500 }
    );
  }
}
