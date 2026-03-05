'use client'

import { m } from 'framer-motion'

export default function PageTransition({
  children,
}:{
  children:React.ReactNode
}) {
  return(
    <m.div 
      initial={{opacity:0,y:16}}

      animate={{opacity:1,y:0}}

      transition={{duration:0.4, ease:'easeOut'}}
    >
      {children}
      </m.div>
  )
}