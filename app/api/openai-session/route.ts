import { NextResponse } from 'next/server'

export async function GET() {
  const apiKey = process.env.OPENAI_API_KEY

  if (!apiKey) {
    return NextResponse.json({ error: 'Missing OpenAI API key' }, { status: 500 })
  }

  return NextResponse.json({
    success: true,
    message: 'OpenAI realtime session ready',
  })
}
