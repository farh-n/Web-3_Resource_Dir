import type { Metadata } from 'next'
import PageTransition from '@/components/PageTransition'
import SubmitClient from '@/components/SubmitClient'

export const metadata: Metadata = {
  title: 'Submit a Resource',
  description: 'Share a Web3 Resource with the community',
}

export default function SubmitPage() {
  return (
    <PageTransition>
      <SubmitClient />
    </PageTransition>
  )
}