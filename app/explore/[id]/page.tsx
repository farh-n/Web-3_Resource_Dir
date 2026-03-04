import { notFound } from 'next/navigation'
import Link from 'next/link'
import resources from '@/data/resources.json'
import type { Resource } from '@/lib/types'
import Badge from '@/components/Badge'

// Tells Next.js all the possible [id] values at build time
// This allows static generation of all detail pages
export function generateStaticParams() {
  return resources.map((r) => ({ id: r.id }))
}

// Generates metadata dynamically per resource
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const {id} = await params
  const resource = resources.find((r) => r.id === id)
  if (!resource) return { title: 'Not Found' }
  return {
    title: `${resource.title}`,
    description: resource.description,
  }
}

export default async function ResourceDetailPage({ params }: { params: Promise< { id: string }> }) {
  const {id}=await params
  const resource =  resources.find((r) => r.id === id) as Resource | undefined

  // If no resource matches this ID, show Next.js 404 page
  if (!resource) notFound()

  // Find related resources: same category, excluding this one, max 3
  const related = (resources as Resource[])
    .filter((r) => r.category === resource.category && r.id !== resource.id)
    .slice(0, 3)

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      {/* Back Link */}
      <Link
        href="/explore"
        className="mb-6 inline-flex items-center gap-1 text-sm text-indigo-600 hover:underline dark:text-indigo-400"
      >
        ← Back to Explore
      </Link>

      {/* Header */}
      <div className="mb-6 flex items-start gap-4">
        {resource.icon && (
          <span className="text-5xl">{resource.icon}</span>
        )}
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {resource.title}
          </h1>
          <div className="mt-2 flex flex-wrap gap-2">
            <Badge variant="difficulty" label={resource.difficulty} />
            <Badge variant="category" label={resource.category} />
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="mb-6 text-gray-600 dark:text-gray-400 leading-relaxed">
        {resource.description}
      </p>

      {/* Tags */}
      <div className="mb-8 flex flex-wrap gap-2">
        {resource.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600 dark:bg-gray-800 dark:text-gray-400"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* CTA */}
      <a
        href={resource.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-6 py-3 font-medium text-white hover:bg-indigo-700"
      >
        Visit Resource ↗
      </a>

      {/* Related Resources */}
      {related.length > 0 && (
        <div className="mt-12">
          <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
            Related Resources
          </h2>
          <div className="flex flex-col gap-3">
            {related.map((r) => (
              <Link
                key={r.id}
                href={`/explore/${r.id}`}
                className="flex items-center gap-3 rounded-lg border border-gray-200 p-4 hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-900"
              >
                {r.icon && <span className="text-xl">{r.icon}</span>}
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{r.title}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{r.category}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}