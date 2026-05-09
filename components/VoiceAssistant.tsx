'use client'

import { useState } from 'react'
import { Room } from 'livekit-client'

export default function VoiceAssistant() {
  const [open, setOpen] = useState(false)
  const [connected, setConnected] = useState(false)
  const [status, setStatus] = useState('Disconnected')
  const [messages, setMessages] = useState<string[]>([])

  const connectVoiceAssistant = async () => {
    try {
      setStatus('Requesting microphone permission...')

      await navigator.mediaDevices.getUserMedia({ audio: true })

      setStatus('Connecting to LiveKit...')

      const livekitRes = await fetch('/api/livekit-token')
      const livekitData = await livekitRes.json()

      const room = new Room()

      await room.connect(livekitData.url, livekitData.token)

      await room.localParticipant.setMicrophoneEnabled(true)

      setStatus('Connecting OpenAI Realtime...')

      const openaiRes = await fetch('/api/openai-session')
      const openaiData = await openaiRes.json()

      console.log(openaiData)

      setConnected(true)

      setStatus('🎤 SAP Voice AI Active')

      setMessages([
        'Microphone connected successfully.',
        'LiveKit realtime session active.',
        'OpenAI realtime initialized.',
        'You can now speak about SAP support issues.',
      ])
    } catch (error) {
      console.error(error)
      setStatus('Microphone or LiveKit connection failed')
    }
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-24 right-5 bg-white text-black px-5 py-3 rounded-full shadow-2xl z-50 font-bold"
      >
        🎧 AI Help
      </button>
    )
  }

  return (
    <div className="fixed bottom-24 right-5 bg-white text-black p-4 rounded-3xl shadow-2xl w-80 z-50">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-bold">🎧 SAP AI Assistant</h2>

        <button
          onClick={() => setOpen(false)}
          className="text-sm text-zinc-500"
        >
          ✕
        </button>
      </div>

      <p className="text-sm mb-3 text-zinc-700">
        Realtime SAP support assistant powered by LiveKit + OpenAI.
      </p>

      <div className="text-xs bg-zinc-100 rounded-xl px-3 py-2 mb-3 text-zinc-700">
        {status}
      </div>

      {messages.length > 0 && (
        <div className="bg-zinc-100 rounded-2xl p-3 mb-3 max-h-40 overflow-auto text-sm space-y-2">
          {messages.map((msg, index) => (
            <div key={index} className="text-zinc-700">
              • {msg}
            </div>
          ))}
        </div>
      )}

      <button
        onClick={connectVoiceAssistant}
        className="bg-black text-white px-4 py-3 rounded-2xl w-full font-bold"
      >
        {connected ? '🎤 Voice AI Active' : 'Start Voice Assistant'}
      </button>
    </div>
  )
}
