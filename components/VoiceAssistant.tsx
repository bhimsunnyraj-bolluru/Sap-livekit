'use client'

import { useState } from 'react'

export default function VoiceAssistant() {
  const [open, setOpen] = useState(false)
  const [connected, setConnected] = useState(false)

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

      <button
        onClick={() => setConnected(!connected)}
        className="bg-black text-white px-4 py-3 rounded-2xl w-full font-bold"
      >
        {connected ? 'Disconnect Voice AI' : 'Start Voice Assistant'}
      </button>
    </div>
  )
}
