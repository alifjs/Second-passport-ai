import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'SecondPassport.ai - Automate Your University Applications',
  description: 'Upload your documents, select universities, get your offer letters',
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

