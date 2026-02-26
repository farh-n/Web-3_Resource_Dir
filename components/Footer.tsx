import Link from "next/link";

export default function Footer(){
    return(
        <footer className="border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
            <div className="mx-auto max-w-7xl px-4 py-8">
                <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        © {new Date().getFullYear()} Web3Dir. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6">
                        <Link href="/explore" className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 ">
                            Explore
                        </Link>
                        <Link href="/paths" className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 ">
                            Paths
                        </Link>
                        <Link href="/submit" className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 ">
                            Submit
                        </Link>
                    </div>
                    <div className="flex items-center gap-4 dark:text-white">
                        <a 
                            href="https://github.com"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Github
                        </a>
                        <a 
                            href="https://twitter.com"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Twitter
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}