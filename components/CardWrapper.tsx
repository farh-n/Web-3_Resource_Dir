'use client'

import { m } from 'framer-motion'
import { useTheme } from 'next-themes'
import { useState, useEffect } from 'react'

export default function CardWrapper({ children }: { children: React.ReactNode }) {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  const hoverShadow = mounted && resolvedTheme === 'dark'
    ? '0 10px 30px rgba(99, 102, 241, 0.15)'
    : '0 10px 30px rgba(0, 0, 0, 0.12)'

  return (
    <m.div
      whileHover={{ y: -4, boxShadow: hoverShadow }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      {children}
    </m.div>
  )
}