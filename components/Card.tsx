import Link from 'next/link'
import Badge from './Badge'
import { motion } from 'framer-motion'
import { useTheme } from 'next-themes'
import { useState, useEffect } from 'react'


type CardProps = {
  id: string
  title: string
  description: string
  icon?: string
  tags: string[]
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  url: string
}

export default function Card({
  id,
  title,
  description,
  icon,
  tags,
  difficulty,
  url,
}: CardProps) {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])


  const hoverShadow= mounted && resolvedTheme ==='dark'
    ? '0 10px 30px rgba(99, 102, 241, 0.15)'
    : '0 10px 30px rgba(0, 0, 0, 0.12)'

    
  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: hoverShadow }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="group flex flex-col rounded-xl border border-gray-200 bg-white p-5 transition-shadow hover:shadow-md dark:border-gray-800 dark:bg-gray-900">

      <div className="mb-3 flex items-center gap-3">
        {icon && <span className="text-2xl">{icon}</span>}
        <h3 className="font-semibold text-gray-900 dark:text-white">{title}</h3>
      </div>


      <p className="mb-4 flex-1 text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
        {description}
      </p>


      <div className="mb-4 flex flex-wrap gap-2">
        <Badge variant="difficulty" label={difficulty} />
        {tags.map((tag) => (
          <Badge key={tag} variant="category" label={tag} />
        ))}
      </div>


      <div className="flex items-center justify-between">
        <Link
          href={`/explore/${id}`}
          className="text-sm font-medium text-indigo-600 hover:underline dark:text-indigo-400"
        >
          View details
        </Link>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
        >
          Visit
        </a>
      </div>
    </motion.div>
  )
}