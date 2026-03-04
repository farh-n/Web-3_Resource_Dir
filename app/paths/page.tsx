import PathsClient from "@/components/PathsClient";
import PageTransition from "@/components/PageTransition";

export const metadata = {
  title: "Learning Paths",
  description: 'Follow structured Web3 learning roadmaps from beginner to advanced'
}

export default function PathsPage() {
  return (
    <PageTransition>
      <PathsClient />
    </PageTransition>
  )
}