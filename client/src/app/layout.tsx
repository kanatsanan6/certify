'use client'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

import { QueryClient, QueryClientProvider } from 'react-query'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const queryClient = new QueryClient()

  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster position="top-right" />
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </body>
    </html>
  )
}
