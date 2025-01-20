import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Instant ID Photo Generator - Create Compliant Photos in Seconds',
  description: 'Generate perfectly sized ID photos for passports, visas, and official documents. Our AI-powered tool ensures compliance with all requirements while providing real-time editing features.',
}

export default function IdPhotoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
    </>
  )
}
