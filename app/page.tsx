import Hero from "@/components/Hero";
import { Metadata } from "next";
import PageTransition from "@/components/PageTransition";

export const metadata: Metadata = {
  title: 'Web3Dir - Your Web3 Learning Hub',
  description: 'Discover curated Web3 resources for DeFi, NFTs, DAOs,Gaming and more.'
}

export default function Home() {
  return (
    <PageTransition>
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-gray-900">
        <Hero />
      </div>
    </PageTransition>
  );
}
