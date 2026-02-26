import Link from 'next/link'

export default function Hero() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 text-center">
      <h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 dark:text-white md:text-5xl">
        Your Web3 Learning Hub
      </h1>
      <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-500 dark:text-gray-400">
        Discover curated resources for DeFi, NFTs, DAOs, and more — from beginner to advanced.
      </p>
      <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
        <Link
          href="/explore"
          className="rounded-lg bg-indigo-600 px-6 py-3 font-medium text-white hover:bg-indigo-700"
        >
          Explore Resources
        </Link>
        <Link
          href="/submit"
          className="rounded-lg border border-gray-300 px-6 py-3 font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
        >
          Submit a Resource
        </Link>
      </div>
    </section>
  )
}