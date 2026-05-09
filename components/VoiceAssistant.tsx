'use client'

import { useRef, useState } from 'react'
import { Room } from 'livekit-client'

export default function VoiceAssistant() {
  const [open, setOpen] = useState(false)
  const [connected, setConnected] = useState(false)
  const [status, setStatus] = useState('Disconnected')
  const [messages, setMessages] = useState<string[]>([])

  const wsRef = useRef<WebSocket | null>(null)

  const connectVoiceAssistant = async () => {
    try {
      setStatus('Requesting microphone permission...')

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })

      setStatus('Connecting to LiveKit...')

      const livekitRes = await fetch('/api/livekit-token')
      const livekitData = await livekitRes.json()

      const room = new Room()

      await room.connect(livekitData.url, livekitData.token)

      await room.localParticipant.setMicrophoneEnabled(true)

      setStatus('Connecting OpenAI Realtime...')

      const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY

      const ws = new WebSocket(
        'wss://api.openai.com/v1/realtime?model=gpt-4o-realtime-preview',
        [
          'realtime',
          `openai-insecure-api-key.${apiKey}`,
          'openai-beta.realtime-v1',
        ]
      )

      wsRef.current = ws

      ws.onopen = () => {
        setConnected(true)

        setStatus('🎤 SAP Voice AI Active')

        setMessages([
          'Microphone connected successfully.',
          'LiveKit realtime session active.',
          'OpenAI realtime websocket connected.',
          'Speak to start SAP AI support conversation.',
        ])

        const audioContext = new AudioContext()

        const source = audioContext.createMediaStreamSource(stream)

        const processor = audioContext.createScriptProcessor(4096, 1, 1)

        source.connect(processor)
        processor.connect(audioContext.destination)

        processor.onaudioprocess = (event) => {
          const inputData = event.inputBuffer.getChannelData(0)

          const pcm16 = new Int16Array(inputData.length)

          for (let i = 0; i < inputData.length; i++) {
            pcm16[i] = inputData[i] * 0x7fff
          }

          if (ws.readyState === WebSocket.OPEN) {
            ws.send(
              JSON.stringify({
                type: 'input_audio_buffer.append',
                audio: btoa(
                  String.fromCharCode(...new Uint8Array(pcm16.buffer))
                ),
              })
            )
          }
        }
      }

      ws.onmessage = async (event) => {
        const data = JSON.parse(event.data)

        console.log('OpenAI event:', data)

        if (data.type === 'response.text.delta') {
          setMessages((prev) => [...prev, data.delta])
        }

        if (data.type === 'response.audio.delta') {
          console.log('Audio response received')
        }
      }

      ws.onerror = (err) => {
        console.error(err)
        setStatus('OpenAI realtime websocket failed')
      }
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
