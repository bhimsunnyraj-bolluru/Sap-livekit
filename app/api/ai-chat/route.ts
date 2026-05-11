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
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `
              You are a SAP S/4HANA AI support assistant.

              Pricing plans:
              - 1 month = $10
              - 3 months = $25
              - 6 months = $50
              - 1 year = $85

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
        max_tokens: 150,
      }),
    })

    const data = await response.json()

    console.log('OpenAI response:', JSON.stringify(data))

    if (!response.ok) {
      return NextResponse.json({
        reply: 'AI service temporarily unavailable.',
        error: data,
      })
    }

    const reply = data?.choices?.[0]?.message?.content

    return NextResponse.json({
      reply: reply || 'We offer SAP access plans starting from 10 dollars per month.',
    })
  } catch (err) {
    console.error('AI CHAT ERROR:', err)

    return NextResponse.json({
      reply: 'We offer SAP access plans starting from 10 dollars per month.',
    })
  }
}
