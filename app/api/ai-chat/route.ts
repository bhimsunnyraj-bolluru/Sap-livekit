import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4.1-mini',
        messages: [
          {
            role: 'system',
            content: `
              You are a SAP S/4HANA AI support assistant.

              Help users with:
              - SAP pricing plans
              - SAP subscriptions
              - SAP Fiori
              - troubleshooting
              - beginner guidance
              - SAP learning support

              Keep responses concise and voice friendly.
            `,
          },
          {
            role: 'user',
            content: body.message,
          },
        ],
      }),
    })

    const data = await response.json()

    return NextResponse.json({
      reply: data.choices?.[0]?.message?.content || 'No response',
    })
  } catch (err) {
    console.error(err)

    return NextResponse.json(
      {
        error: 'AI request failed',
      },
      { status: 500 }
    )
  }
}
