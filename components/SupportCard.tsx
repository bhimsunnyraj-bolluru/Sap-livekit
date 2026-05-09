'use client'

import { useState } from 'react'
import { generateTicketId } from '../lib/ticket'

export default function SupportCard() {
  const [issue, setIssue] = useState('')
  const [ticketId] = useState(generateTicketId())
  const [fileName, setFileName] = useState('')

  const submitIssue = () => {
    const message = `Hi, I am an existing SAP member and need help.%0A%0ATicket ID: ${ticketId}%0A%0AIssue:%0A${encodeURIComponent(issue)}%0A%0AScreenshot: ${encodeURIComponent(fileName || 'No screenshot uploaded')}`

    window.open(`https://wa.me/918332992627?text=${message}`, '_blank')
  }

  return (
    <div className="glass-card rounded-3xl p-6 mb-8">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-2xl font-bold">
          🛠 Existing Member Support
        </h2>

        <div className="bg-zinc-800 text-xs px-3 py-1 rounded-full text-zinc-300">
          {ticketId}
        </div>
      </div>

      <p className="text-zinc-400 mb-4 text-sm">
        Facing an issue? Describe your problem and send it directly to support.
      </p>

      <textarea
        value={issue}
        onChange={(e) => setIssue(e.target.value)}
        placeholder="Example: Unable to login to SAP Fiori launchpad..."
        className="w-full min-h-[120px] rounded-2xl p-4 text-black mb-4"
      />

      <label className="block mb-4">
        <div className="bg-zinc-800 border border-zinc-700 rounded-2xl p-4 text-center cursor-pointer text-zinc-300">
          📸 Upload Screenshot
        </div>

        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) {
              setFileName(file.name)
            }
          }}
        />
      </label>

      {fileName && (
        <div className="text-sm text-green-400 mb-4">
          Uploaded: {fileName}
        </div>
      )}

      <button
        onClick={submitIssue}
        className="w-full bg-red-500 text-white py-4 rounded-2xl font-bold"
      >
        Send Issue on WhatsApp
      </button>
    </div>
  )
}
