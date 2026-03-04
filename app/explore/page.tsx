import { Suspense } from "react";
import ExploreClient from "@/components/ExploreClient";
import PageTransition from "@/components/PageTransition";

export const metadata = {
  title: 'Explore Resources',
  description: "Browse and Filter curated Web3 resources"
}

export default function ExplorePage() {
  return (
    <PageTransition >
      <Suspense fallback={
        <div className="mx-auto max-w-7xl px-4 py-16 text-center text-gray-500">
          Loading Resources...
        </div>
      }>
        <ExploreClient />
      </Suspense>
    </ PageTransition>
  )
}