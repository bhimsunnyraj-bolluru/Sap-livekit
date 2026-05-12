'use client'

import { useState } from 'react'

export default function VoiceAssistant() {
  const [open, setOpen] = useState(false)
  const [listening, setListening] = useState(false)
  const [messages, setMessages] = useState<string[]>([])
  const [status, setStatus] = useState('Ready')

  const getBestFemaleVoice = () => {
    const voices = speechSynthesis.getVoices()

    const preferredVoices = [
      'Microsoft Aria Online (Natural)',
      'Microsoft Jenny Online (Natural)',
      'Google UK English Female',
      'Samantha',
      'Karen',
      'Moira',
      'Tessa',
      'Veena',
      'Fiona',
      'Victoria',
      'Zira',
    ]

    for (const preferred of preferredVoices) {
      const match = voices.find((voice) =>
        voice.name.toLowerCase().includes(preferred.toLowerCase())
      )

      if (match) {
        console.log('Using female voice:', match.name)
        return match
      }
    }

    const fallbackFemale = voices.find(
      (voice) =>
        voice.name.toLowerCase().includes('female') ||
        voice.name.toLowerCase().includes('woman')
    )

    if (fallbackFemale) {
      console.log('Using fallback female voice:', fallbackFemale.name)
      return fallbackFemale
    }

    console.log('No female voice found, using browser default')
    return null
  }

  const startVoiceAssistant = async () => {
    try {
      const SpeechRecognition =
        (window as any).SpeechRecognition ||
        (window as any).webkitSpeechRecognition

      if (!SpeechRecognition) {
        alert('Speech recognition not supported in this browser')
        return
      }

      speechSynthesis.getVoices()

      const recognition = new SpeechRecognition()

      recognition.lang = 'en-US'
      recognition.continuous = false
      recognition.interimResults = false

      recognition.onstart = () => {
        setListening(true)
        setStatus('🎤 Listening...')
      }

      recognition.onresult = async (event: any) => {
        const transcript = event.results[0][0].transcript

        setMessages((prev) => [...prev, `🧑 You: ${transcript}`])

        setStatus('🤖 Thinking...')

        const res = await fetch('/api/ai-chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: transcript,
          }),
        })

        const data = await res.json()

        const reply = data.reply || 'Sorry, I could not respond.'

        setMessages((prev) => [...prev, `🤖 SAP AI: ${reply}`])

        setStatus('🔊 Speaking...')

        speechSynthesis.cancel()

        const utterance = new SpeechSynthesisUtterance(reply)

        const femaleVoice = getBestFemaleVoice()

        if (femaleVoice) {
          utterance.voice = femaleVoice
        }

        utterance.lang = 'en-US'
        utterance.rate = 0.95
        utterance.pitch = 1.35
        utterance.volume = 1

        speechSynthesis.speak(utterance)

        utterance.onend = () => {
          setStatus('Ready')
          setListening(false)
        }
      }

      recognition.onerror = () => {
        setListening(false)
        setStatus('Speech recognition failed')
      }

      recognition.start()
    } catch (err) {
      console.error(err)
      setStatus('Voice assistant failed')
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
        SAP voice support assistant powered by OpenAI.
      </p>

      <div className="text-xs bg-zinc-100 rounded-xl px-3 py-2 mb-3 text-zinc-700">
        {status}
      </div>

      <div className="bg-zinc-100 rounded-2xl p-3 mb-3 max-h-56 overflow-auto text-sm space-y-2">
        {messages.length === 0 ? (
          <div className="text-zinc-500">
            Ask about SAP subscriptions, pricing, access, or SAP support.
          </div>
        ) : (
          messages.map((msg, index) => (
            <div key={index} className="text-zinc-700 whitespace-pre-wrap">
              {msg}
            </div>
          ))
        )}
      </div>

      <button
        onClick={startVoiceAssistant}
        disabled={listening}
        className="bg-black text-white px-4 py-3 rounded-2xl w-full font-bold"
      >
        {listening ? '🎤 Listening...' : 'Start Voice Assistant'}
      </button>
    </div>
  )
}
