'use client'

import { useState } from 'react'
import { Room } from 'livekit-client'

export default function VoiceAssistant() {
  const [open, setOpen] = useState(false)
  const [connected, setConnected] = useState(false)
  const [status, setStatus] = useState('Disconnected')

  const connectVoiceAssistant = async () => {
    try {
      setStatus('Connecting...')

      const res = await fetch('/api/livekit-token')
      const data = await res.json()

      const room = new Room()

      await room.connect(data.url, data.token)

      await room.localParticipant.enableCameraAndMicrophone(false, true)

      setConnected(true)
      setStatus('🎤 Voice AI Connected')
    } catch (error) {
      console.error(error)
      setStatus('Connection failed')
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
    <div className="fixed bottom-24 right-5 bg-white text-black p-4 rounded-3xl shadow-2xl w-72 z-50">
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
        Ask about pricing, SAP access, and subscriptions.
      </p>

      <div className="text-xs bg-zinc-100 rounded-xl px-3 py-2 mb-3 text-zinc-700">
        {status}
      </div>

      <button
        onClick={connectVoiceAssistant}
        className="bg-black text-white px-4 py-3 rounded-2xl w-full font-bold"
      >
        {connected ? 'Voice AI Active' : 'Start Voice Assistant'}
      </button>
    </div>
  )
}
