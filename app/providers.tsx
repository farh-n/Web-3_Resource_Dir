'use client'

import { ThemeProvider } from "next-themes"
import React from "react"
import { LazyMotion, domAnimation} from "framer-motion"

export function Providers({children}:{children:React.ReactNode}){
    return(
        <ThemeProvider 
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
        >
            <LazyMotion features={domAnimation} strict>
                {children}
            </LazyMotion>
            
        </ThemeProvider>
    )
}