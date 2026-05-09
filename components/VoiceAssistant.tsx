'use client'

import { useState } from 'react'

export default function VoiceAssistant() {
  const [connected, setConnected] = useState(false)

  return (
    <div className="fixed bottom-6 right-6 bg-white text-black p-4 rounded-2xl shadow-2xl w-80">
      <h2 className="text-xl font-bold mb-2">🎧 SAP AI Assistant</h2>

      <p className="text-sm mb-4">
        Ask about SAP subscription plans and live access.
      </p>

      <button
        onClick={() => setConnected(!connected)}
        className="bg-black text-white px-4 py-2 rounded-xl w-full"
      >
        {connected ? 'Disconnect' : 'Start Voice Assistant'}
      </button>
    </div>
  )
}
