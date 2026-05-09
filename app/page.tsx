import VoiceAssistant from '../components/VoiceAssistant'

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white p-10">
      <h1 className="text-5xl font-bold mb-6">
        🚀 SAP S/4HANA 2025 – Live Access
      </h1>

      <p className="text-xl mb-10">
        Practice SAP in a real-time environment with AI voice support.
      </p>

      <div className="grid gap-4 md:grid-cols-4">
        <div className="border p-4 rounded-xl">
          <h2 className="text-2xl font-bold">1 Month</h2>
          <p>₹1,000 / $10</p>
        </div>

        <div className="border p-4 rounded-xl">
          <h2 className="text-2xl font-bold">3 Months</h2>
          <p>₹2,500 / $25</p>
        </div>

        <div className="border p-4 rounded-xl">
          <h2 className="text-2xl font-bold">6 Months</h2>
          <p>₹4,500 / $50</p>
        </div>

        <div className="border p-4 rounded-xl">
          <h2 className="text-2xl font-bold">1 Year</h2>
          <p>₹8,000 / $85</p>
        </div>
      </div>

      <div className="mt-16 border rounded-xl p-6 bg-zinc-900">
        <h2 className="text-3xl font-bold mb-4">🎧 Talk to SAP AI Assistant</h2>

        <p>
          Ask about pricing, subscriptions, and SAP access.
        </p>
      </div>

      <VoiceAssistant />
    </main>
  )
}
