import { Suspense } from "react";
import ExploreClient from "@/components/ExploreClient";

export const metadata = {
  title: 'Explore Resources | Web3Dir',
  description: "Browse and Filter curated Web3 resources"
}

export default function ExplorePage() {
  return (
    <Suspense fallback={
      <div className="mx-auto max-w-7xl px-4 py-16 text-center text-gray-500">
        Loading Resources...
      </div>
    }>
      <ExploreClient />
    </Suspense>
  )
}