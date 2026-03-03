'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import paths from '@/data/paths.json'
import resources from '@/data/resources.json'
import type { Resource } from '@/lib/types'

// We need a type for a path since it's not in our types file yet
type LearningPath = {
  id: string
  title: string
  description: string
  icon: string
  resourceIds: string[]
}

export default function PathsClient() {
  // completed is a Set of resource IDs the user has marked as complete
  // We use localStorage to persist this across page refreshes
  const [completed, setCompleted] = useState<Set<string>>(new Set())

  // Load saved progress from localStorage when the component first mounts
  useEffect(() => {
    const saved = localStorage.getItem('completedResources')
    if (saved) {
      // localStorage only stores strings, so we parse the JSON back into an array
      // then convert it to a Set for fast lookup
      setCompleted(new Set(JSON.parse(saved)))
    }
  }, []) // empty array = run once on mount

  function toggleComplete(resourceId: string) {
    setCompleted((prev) => {
      // Copy the existing Set — never mutate state directly
      const updated = new Set(prev)

      if (updated.has(resourceId)) {
        updated.delete(resourceId)
      } else {
        updated.add(resourceId)
      }

      // Save the updated Set to localStorage as a JSON array
      localStorage.setItem('completedResources', JSON.stringify([...updated]))
      return updated
    })
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
        Learning Paths
      </h1>
      <p className="mb-10 text-gray-500 dark:text-gray-400">
        Follow structured roadmaps and track your progress as you go.
      </p>

      <div className="flex flex-col gap-10">
        {(paths as LearningPath[]).map((path) => {
          // Look up the full resource objects for this path's IDs
          const pathResources = path.resourceIds
            .map((id) => (resources as Resource[]).find((r) => r.id === id))
            .filter(Boolean) as Resource[]

          // How many of this path's resources has the user completed?
          const completedCount = pathResources.filter((r) =>
            completed.has(r.id)
          ).length

          const totalCount = pathResources.length
          // Progress as a percentage for the progress bar width
          const progressPercent = Math.round((completedCount / totalCount) * 100)

          return (
            <div
              key={path.id}
              className="rounded-xl border border-gray-200 p-6 dark:border-gray-800"
            >
              {/* Path Header */}
              <div className="mb-4 flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{path.icon}</span>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {path.title}
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {path.description}
                    </p>
                  </div>
                </div>
                <span className="shrink-0 text-sm font-medium text-indigo-600 dark:text-indigo-400">
                  {completedCount}/{totalCount} done
                </span>
              </div>

              {/* Progress Bar */}
              <div className="mb-6 h-2 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                <div
                  className="h-2 rounded-full bg-indigo-500 transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              {/* Resource Steps */}
              <ol className="flex flex-col gap-3">
                {pathResources.map((resource, index) => {
                  const isDone = completed.has(resource.id)

                  return (
                    <li
                      key={resource.id}
                      className={`flex items-center justify-between rounded-lg border p-4 transition-colors ${
                        isDone
                          ? 'border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-950/30'
                          : 'border-gray-200 dark:border-gray-700'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {/* Step number */}
                        <span
                          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                            isDone
                              ? 'bg-green-500 text-white'
                              : 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400'
                          }`}
                        >
                          {isDone ? '✓' : index + 1}
                        </span>

                        <div>
                          <Link
                            href={`/explore/${resource.id}`}
                            className="font-medium text-gray-900 hover:text-indigo-600 dark:text-white dark:hover:text-indigo-400"
                          >
                            {resource.title}
                          </Link>
                          <p className="text-xs text-gray-400">{resource.category}</p>
                        </div>
                      </div>

                      {/* Mark as complete button */}
                      <button
                        onClick={() => toggleComplete(resource.id)}
                        className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                          isDone
                            ? 'bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300'
                        }`}
                      >
                        {isDone ? '✓ Done' : 'Mark done'}
                      </button>
                    </li>
                  )
                })}
              </ol>
            </div>
          )
        })}
      </div>
    </div>
  )
}