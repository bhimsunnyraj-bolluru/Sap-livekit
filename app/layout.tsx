import './globals.css'

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
      <body>{children}</body>
    </html>
  )
}
