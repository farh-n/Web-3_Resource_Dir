'use client'

import { useState,useEffect } from "react"
import { useTheme } from "next-themes"
import Link from "next/link"

export default function Navbar(){
    const {theme,setTheme}=useTheme()
    const [menuOpen,setMenuOpen]=useState(false)
    const [mounted,setMounted]=useState(false)

    useEffect(() => {
  // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
    }, []);   

    return(
        <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-sm dark:border-gray-800 dark:bg-blue-950/80 ">
            <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
                <button onClick={()=> setMenuOpen(!menuOpen)}
                        className="md:hidden rounded-lg p-2"
                        >
                        ☰
                    </button>
                
                <Link href='/' className="text-xl font-bold text-gray-900 dark:text-white">
                Web3Dir
                </Link>
                <div className="hidden items-center gap-6 md:flex">
                    <Link href='/explore' className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                        Explore
                    </Link>

                    <Link href='/paths' className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                        Learning Paths
                    </Link>
                </div>


                
                <div className="flex items-center gap-3">
                    
                    <input 
                        type="search"
                        placeholder="Search resources here"
                        className="hidden rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:placeholder-gray-500 md:block"
                    />

                    {mounted ? (
                        <button 
                            onClick={()=> setTheme(theme==='dark' ? 'light' : 'dark')}
                            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                            aria-label="Toggle Dark Mode"
                        >
                            {theme==='dark' ? '☀️': '🌙'}
                        </button>
                    ):(
                        <div className="h-9 w-9" />
                    )}
                    <Link href='/submit' className="rounded-lg bg-indigo-600 px-6 py-2 text-sm font-medium text-white hover:bg-indigo-700">
                        Submit Resource
                    </Link>
                </div>
            </nav>

            {/* For Mobile screens */}
            {menuOpen && (
                <div className="border-t border-gray-300 bg-white p-4 dark:border-gray-800 dark:bg-gray-950 md:hidden">
                    <div className="flex flex-col gap-3">
                        <Link href="/explore" 
                            className="text-sm font-medium text-gray-600 dark:text-gray-400"
                            onClick={()=>setMenuOpen(false)}
                        >
                            Explore
                        </Link>

                        <Link href="/paths" 
                            className="text-sm font-medium text-gray-600 dark:text-gray-400"
                            onClick={()=>setMenuOpen(false)}
                            >
                            Learning Paths
                        </Link>
                        <input 
                        type="search"
                        placeholder="Search resources here"
                        className="md:hidden rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:placeholder-gray-500 "
                    />


                    </div>
                </div>
            )
        }

        </header>
    )
} 
