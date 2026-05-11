import 'dotenv/config'

import { fileURLToPath } from 'url'

import { WorkerOptions, cli, defineAgent } from '@livekit/agents'
import * as openai from '@livekit/agents-plugin-openai'

console.log('🚀 SAP AI Agent booting...')
console.log('LIVEKIT_URL:', process.env.LIVEKIT_URL ? 'SET' : 'MISSING')
console.log('LIVEKIT_API_KEY:', process.env.LIVEKIT_API_KEY ? 'SET' : 'MISSING')
console.log('LIVEKIT_API_SECRET:', process.env.LIVEKIT_API_SECRET ? 'SET' : 'MISSING')
console.log('OPENAI_API_KEY:', process.env.OPENAI_API_KEY ? 'SET' : 'MISSING')

export default defineAgent({
  entry: async (ctx) => {
    try {
      console.log('🎤 Agent entry started')
      console.log('🔌 Connecting to LiveKit room...')

      await ctx.connect()

      console.log('✅ Connected to LiveKit room')
      console.log('🏠 Room name:', ctx.room.name)

      console.log('🧪 ctx methods:', Object.keys(ctx))

      const model = new openai.realtime.RealtimeModel({
        instructions: `
          You are a SAP S/4HANA AI support assistant.
          Help users with SAP pricing, subscriptions, SAP Fiori, troubleshooting, and beginner support.
        `,
        voice: 'alloy',
      })

      console.log('🤖 OpenAI realtime model created')
      console.log('🧪 model methods:', Object.getOwnPropertyNames(Object.getPrototypeOf(model)))

      const session = model.session()

      console.log('🧪 session methods:', Object.getOwnPropertyNames(Object.getPrototypeOf(session)))

      console.log('🎧 Attempting realtime session start...')

      if (typeof session.start === 'function') {
        await session.start(ctx.room)
        console.log('✅ session.start worked')
      } else {
        console.log('❌ session.start missing')
      }

      console.log('🔊 Agent audio tracks should now publish')
    } catch (err) {
      console.error('❌ AGENT FAILURE')
      console.error(err)
    }
  },
})

console.log('🏃 Starting LiveKit worker runtime...')

cli.runApp(
  new WorkerOptions({
    agent: fileURLToPath(import.meta.url),
  })
)
