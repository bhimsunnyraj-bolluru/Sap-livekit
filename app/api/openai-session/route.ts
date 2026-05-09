import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const apiKey = process.env.OPENAI_API_KEY

    if (!apiKey) {
      return NextResponse.json(
        { error: 'Missing OpenAI API key' },
        { status: 500 }
      )
    }

    const response = await fetch(
      'https://api.openai.com/v1/realtime/sessions',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o-realtime-preview',
          voice: 'alloy',
          instructions:
            'You are a SAP S/4HANA AI support assistant. Help users with SAP access, pricing, subscriptions, SAP Fiori issues, troubleshooting, and training support.',
        }),
      }
    )

    const data = await response.json()

    return NextResponse.json(data)
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      { error: 'Failed to create realtime session' },
      { status: 500 }
    )
  }
}
