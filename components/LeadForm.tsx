'use client'

import { useState } from 'react'

export default function LeadForm() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')

  const submitLead = () => {
    const message = `Hi, I want SAP S/4HANA access.%0A%0AName: ${encodeURIComponent(name)}%0AWhatsApp: ${encodeURIComponent(phone)}`

    window.open(`https://wa.me/918332992627?text=${message}`, '_blank')
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
        Continue on WhatsApp
      </button>
    </div>
  )
}
