import { AccessToken } from 'livekit-server-sdk'
import { NextResponse } from 'next/server'

export async function GET() {
  const apiKey = process.env.LIVEKIT_API_KEY
  const apiSecret = process.env.LIVEKIT_API_SECRET

  if (!apiKey || !apiSecret) {
    return NextResponse.json({ error: 'Missing LiveKit credentials' }, { status: 500 })
  }

  const token = new AccessToken(apiKey, apiSecret, {
    identity: `user-${Math.floor(Math.random() * 10000)}`,
  })

  token.addGrant({
    roomJoin: true,
    room: 'sap-support-room',
    canPublish: true,
    canSubscribe: true,
  })

  return NextResponse.json({
    token: await token.toJwt(),
    url: process.env.LIVEKIT_URL,
  })
}
