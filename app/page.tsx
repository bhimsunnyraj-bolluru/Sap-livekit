import VoiceAssistant from '../components/VoiceAssistant'
import LeadForm from '../components/LeadForm'

export default function Home() {
  const whatsappBase = 'https://wa.me/918332992627?text='

  const plans = [
    {
      duration: '1 Month',
      price: '₹1,000',
      usd: '$10',
      message: 'Hi, I am interested in the 1 Month SAP S/4HANA plan for ₹1,000 / $10',
    },
    {
      duration: '3 Months',
      price: '₹2,500',
      usd: '$25',
      message: 'Hi, I am interested in the 3 Months SAP S/4HANA plan for ₹2,500 / $25',
    },
    {
      duration: '6 Months',
      price: '₹4,500',
      usd: '$50',
      message: 'Hi, I am interested in the 6 Months SAP S/4HANA plan for ₹4,500 / $50',
    },
    {
      duration: '1 Year',
      price: '₹8,000',
      usd: '$85',
      message: 'Hi, I am interested in the 1 Year SAP S/4HANA plan for ₹8,000 / $85',
    },
  ]

  return (
    <main className="mobile-container px-5 py-6">
      <section>
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-zinc-400 text-sm">Welcome Back 👋</p>
            <h1 className="text-3xl font-bold mt-1">
              SAP S/4HANA 2025
            </h1>
          </div>

          <div className="w-14 h-14 rounded-2xl glass-card flex items-center justify-center text-2xl">
            🚀
          </div>
        </div>

        <div className="glass-card rounded-3xl p-6 mb-6">
          <p className="text-zinc-300 mb-3">
            Real-time SAP practice environment with AI support.
          </p>

          <h2 className="text-4xl font-bold leading-tight mb-5">
            Practice Like a Real SAP Consultant
          </h2>

          <a
            href={`${whatsappBase}${encodeURIComponent('Hi I am interested in SAP S/4HANA Live Access')}`}
            target="_blank"
            className="block bg-white text-black text-center py-4 rounded-2xl font-bold"
          >
            Start SAP Practice
          </a>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          {plans.map((plan) => (
            <a
              key={plan.duration}
              href={`${whatsappBase}${encodeURIComponent(plan.message)}`}
              target="_blank"
              className="glass-card rounded-3xl p-5 block active:scale-95 transition"
            >
              <p className="text-zinc-400 text-sm">{plan.duration}</p>
              <h2 className="text-3xl font-bold mt-2">{plan.price}</h2>
              <p className="text-zinc-500 mb-4">{plan.usd}</p>

              <div className="bg-green-500 text-white text-center py-2 rounded-xl text-sm font-bold">
                Select Plan
              </div>
            </a>
          ))}
        </div>

        <div className="glass-card rounded-3xl p-6 mb-8">
          <h2 className="text-2xl font-bold mb-5">
            💡 What You Get
          </h2>

          <div className="space-y-4 text-zinc-300">
            <div>✔ SAP Fiori Launchpad Access</div>
            <div>✔ Real-time Business Scenarios</div>
            <div>✔ Practice like real SAP projects</div>
            <div>✔ AI-guided learning support</div>
            <div>✔ Consultant & beginner friendly</div>
          </div>
        </div>

        <LeadForm />
      </section>

      <div className="bottom-nav">
        <a
          href={`${whatsappBase}${encodeURIComponent('Hi I am interested in SAP S/4HANA Live Access')}`}
          target="_blank"
          className="block bg-green-500 text-center text-white py-4 rounded-2xl font-bold"
        >
          💬 Chat on WhatsApp
        </a>
      </div>

      <VoiceAssistant />
    </main>
  )
}
