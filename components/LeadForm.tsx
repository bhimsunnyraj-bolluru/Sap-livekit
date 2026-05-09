'use client'

import { useState } from 'react'

export default function LeadForm() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')

  const submitLead = async () => {
    const res = await fetch('/api/lead', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, phone }),
    })

    const data = await res.json()
    setMessage(data.message)
  }

  return (
    <div className="mt-10 border border-zinc-700 rounded-2xl p-6 bg-zinc-900 max-w-xl">
      <h2 className="text-2xl font-bold mb-4">📩 Get SAP Access</h2>

      <input
        placeholder="Your Name"
        className="w-full p-3 rounded-lg text-black mb-4"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="WhatsApp Number"
        className="w-full p-3 rounded-lg text-black mb-4"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      <button
        onClick={submitLead}
        className="bg-white text-black px-5 py-3 rounded-xl font-bold w-full"
      >
        Submit
      </button>

      {message && <p className="mt-4 text-green-400">{message}</p>}
    </div>
  )
}
