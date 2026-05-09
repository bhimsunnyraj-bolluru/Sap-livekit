import 'dotenv/config'

import { WorkerOptions, cli, defineAgent } from '@livekit/agents'
import * as openai from '@livekit/agents-plugin-openai'

export default defineAgent({
  entry: async (ctx) => {
    console.log('SAP AI Agent starting...')

    await ctx.connect()

    const agent = new openai.realtime.RealtimeModel({
      instructions: `
        You are a SAP S/4HANA AI support assistant.

        Help users with:
        - SAP pricing plans
        - SAP Fiori access
        - subscription support
        - SAP troubleshooting
        - beginner guidance
        - SAP project learning

        Speak clearly and professionally.
      `,
      voice: 'alloy',
    })

    agent.start(ctx.room)

    console.log('SAP AI Agent connected successfully')
  },
})

cli.runApp(
  new WorkerOptions({
    agent: fileURLToPath(import.meta.url),
  })
)
