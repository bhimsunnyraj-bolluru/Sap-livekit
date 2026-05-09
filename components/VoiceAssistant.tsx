'use client'

import { useState } from 'react'

export default function VoiceAssistant() {
  const [connected, setConnected] = useState(false)

  return (
    <div className="fixed bottom-6 right-6 bg-white text-black p-4 rounded-2xl shadow-2xl w-80 z-50">
      <h2 className="text-xl font-bold mb-2">🎧 SAP AI Assistant</h2>

      <p className="text-sm mb-4">
        Welcome to SAP S/4HANA Live Access Platform.
      </p>

      <div className="bg-zinc-100 rounded-xl p-3 text-sm mb-4">
        <p>
          Ask about:
        </p>

        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>Subscription pricing</li>
          <li>SAP Fiori access</li>
          <li>Live project practice</li>
          <li>Consultant learning path</li>
        </ul>
      </div>

      <button
        onClick={() => setConnected(!connected)}
        className="bg-black text-white px-4 py-3 rounded-xl w-full font-bold"
      >
        {connected ? 'Disconnect Voice AI' : 'Start Voice Assistant'}
      </button>
    </div>
  )
}
