import VoiceAssistant from '../components/VoiceAssistant'
import LeadForm from '../components/LeadForm'

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white p-10">
      <section className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold mb-6 leading-tight">
          🚀 Practice SAP S/4HANA in a Real-Time Environment
        </h1>

        <p className="text-xl mb-10 text-zinc-300 max-w-3xl">
          Learn SAP with live system access, business scenarios, AI guidance,
          and real project-style practice.
        </p>

        <div className="flex gap-4 mb-12 flex-wrap">
          <button className="bg-white text-black px-6 py-3 rounded-xl font-bold">
            Start SAP Practice
          </button>

          <button className="border border-white px-6 py-3 rounded-xl font-bold">
            Talk to AI Assistant
          </button>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <div className="border border-zinc-700 p-5 rounded-2xl bg-zinc-900">
            <h2 className="text-2xl font-bold">1 Month</h2>
            <p className="text-3xl mt-2">₹1,000</p>
            <p className="text-zinc-400">$10</p>
          </div>

          <div className="border border-zinc-700 p-5 rounded-2xl bg-zinc-900">
            <h2 className="text-2xl font-bold">3 Months</h2>
            <p className="text-3xl mt-2">₹2,500</p>
            <p className="text-zinc-400">$25</p>
          </div>

          <div className="border border-zinc-700 p-5 rounded-2xl bg-zinc-900">
            <h2 className="text-2xl font-bold">6 Months</h2>
            <p className="text-3xl mt-2">₹4,500</p>
            <p className="text-zinc-400">$50</p>
          </div>

          <div className="border border-zinc-700 p-5 rounded-2xl bg-zinc-900">
            <h2 className="text-2xl font-bold">1 Year</h2>
            <p className="text-3xl mt-2">₹8,000</p>
            <p className="text-zinc-400">$85</p>
          </div>
        </div>

        <div className="mt-16 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6">
              💡 What You Get
            </h2>

            <ul className="space-y-4 text-lg text-zinc-300">
              <li>✔ SAP Fiori Launchpad Access</li>
              <li>✔ Real-time Business Scenarios</li>
              <li>✔ Practice like real SAP projects</li>
              <li>✔ AI-guided learning support</li>
              <li>✔ Perfect for consultants & beginners</li>
            </ul>
          </div>

          <LeadForm />
        </div>
      </section>

      <VoiceAssistant />
    </main>
  )
}
