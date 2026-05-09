'use client'

import { useState } from 'react'

export default function SupportCard() {
  const [issue, setIssue] = useState('')

  const submitIssue = () => {
    const message = `Hi, I am an existing SAP member and need help.%0A%0AIssue:%0A${encodeURIComponent(issue)}`

    window.open(`https://wa.me/918332992627?text=${message}`, '_blank')
  }

  return (
    <div className="glass-card rounded-3xl p-6 mb-8">
      <h2 className="text-2xl font-bold mb-3">
        🛠 Existing Member Support
      </h2>

      <p className="text-zinc-400 mb-4 text-sm">
        Facing an issue? Describe your problem and contact support instantly.
      </p>

      <textarea
        value={issue}
        onChange={(e) => setIssue(e.target.value)}
        placeholder="Example: Unable to login to SAP Fiori launchpad..."
        className="w-full min-h-[120px] rounded-2xl p-4 text-black mb-4"
      />

      <button
        onClick={submitIssue}
        className="w-full bg-red-500 text-white py-4 rounded-2xl font-bold"
      >
        Send Issue on WhatsApp
      </button>
    </div>
  )
}
