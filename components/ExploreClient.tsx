'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import resources from '@/data/resources.json'
import type { Resource, Category, Difficulty } from '@/lib/types'
import Card from './Card'
import SkeletonCard from './SkeletonCard'


const CATEGORIES: Category[] = ['DeFi', 'NFTs', 'Gaming', 'Infra', 'DAO', 'DevTools']
const DIFFICULTIES: Difficulty[] = ['Beginner', 'Intermediate', 'Advanced']
const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured First' },
  { value: 'newest', label: 'Newest' },
  { value: 'az', label: 'A–Z' },
]


function filterAndSort(
  data: Resource[],
  search: string,
  category: string,
  difficulty: string,
  sort: string
): Resource[] {
  let result = [...data]

  // Search filter — checks title, description, and tag
  if (search) {
    const lower = search.toLowerCase()
    result = result.filter(
      (r) =>
        r.title.toLowerCase().includes(lower) ||
        r.description.toLowerCase().includes(lower) ||
        r.tags.some((t) => t.toLowerCase().includes(lower))
    )
  }

  // Category filter
  if (category) {
    result = result.filter((r) => r.category === category)
  }

  // Difficulty filter
  if (difficulty) {
    result = result.filter((r) => r.difficulty === difficulty)
  }

  // Sort
  if (sort === 'featured') {
    result.sort((a, b) => Number(b.featured) - Number(a.featured))
  } else if (sort === 'newest') {
    result.sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime())
  } else if (sort === 'az') {
    result.sort((a, b) => a.title.localeCompare(b.title))
  }

  return result
}

// main component
export default function ExploreClient() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Read initial state from URL params — this makes links shareable
  const [search, setSearch] = useState(searchParams.get('search') ?? '')
  const [category, setCategory] = useState(searchParams.get('category') ?? '')
  const [difficulty, setDifficulty] = useState(searchParams.get('difficulty') ?? '')
  const [sort, setSort] = useState(searchParams.get('sort') ?? 'featured')
  const [debouncedSearch, setDebouncedSearch] = useState(search)
  const [isLoading, setIsLoading] = useState(true)

  // Debounce 
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search)
    }, 500)

    // if the user types again before 300ms, cancel the previous timer
    return () => clearTimeout(timer)
  }, [search])

  //set skeletons for loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800)

    return () => clearTimeout(timer)
  }, [])

  // Sync filters to URL whenever they change
  const updateURL = useCallback(
    (newSearch: string, newCategory: string, newDifficulty: string, newSort: string) => {
      const params = new URLSearchParams()
      if (newSearch) params.set('search', newSearch)
      if (newCategory) params.set('category', newCategory)
      if (newDifficulty) params.set('difficulty', newDifficulty)
      if (newSort && newSort !== 'featured') params.set('sort', newSort)

      const query = params.toString()
      // router.replace doesn't add to browser history — correct for filter change
      router.replace(`${pathname}${query ? `?${query}` : ''}`, { scroll: false })
    },
    [router, pathname]
  )

  // Every time any filter changes, update the URL
  useEffect(() => {
    updateURL(debouncedSearch, category, difficulty, sort)
  }, [debouncedSearch, category, difficulty, sort, updateURL])

  const filtered = filterAndSort(
    resources as Resource[],
    debouncedSearch,
    category,
    difficulty,
    sort
  )

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
        Explore Resources
      </h1>
      <p className="mb-8 text-gray-500 dark:text-gray-400">
        {filtered.length} resource{filtered.length !== 1 ? 's' : ''} found
      </p>

      {/* Filters Bar */}
      <div className="mb-8 flex flex-col gap-4">
        {/* Search */}
        <input
          type="search"
          placeholder="Search by name, description, or tag..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:placeholder-gray-500"
        />

        <div className="flex flex-wrap items-center gap-3">
          {/* Category Pills */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setCategory('')}
              className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${category === ''
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                }`}
            >
              All
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(category === cat ? '' : cat)}
                className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${category === cat
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Difficulty Filter */}
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
          >
            <option value="">All Levels</option>
            {DIFFICULTIES.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>

          {/* Sort */}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Results Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : filtered.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((resource) => (
            <Card key={resource.id} {...resource} />
          ))}
        </div>
      ) : (
        // Empty State
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <span className="mb-4 text-5xl">🔍</span>
          <h2 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
            No resources found
          </h2>
          <p className="mb-6 text-gray-500 dark:text-gray-400">
            Try adjusting your search or filters
          </p>
          <button
            onClick={() => {
              setSearch('')
              setCategory('')
              setDifficulty('')
              setSort('featured')
            }}
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  )
}