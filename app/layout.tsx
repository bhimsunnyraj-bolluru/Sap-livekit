import './globals.css'
import { Analytics } from '@vercel/analytics/next'

export const metadata = {
  title: 'SAP LiveKit AI',
  description: 'SAP S/4HANA AI Assistant',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
