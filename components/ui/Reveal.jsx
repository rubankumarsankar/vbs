'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { cn } from '@/lib/utils'

export function Reveal({ children, className, delay = 0, yOffset = 40, duration = 0.7, scale = 1, once = true }) {
    const ref = useRef(null)
    const inView = useInView(ref, { once, margin: "-50px" })

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: yOffset, scale: scale }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: yOffset, scale: scale }}
            transition={{
                duration,
                delay,
                ease: [0.21, 0.47, 0.32, 0.98], // Custom spring-like easing
            }}
            className={className}
        >
            {children}
        </motion.div>
    )
}

export function StaggerChildren({ children, className, delay = 0.1, staggerAmount = 0.1, once = true }) {
    const ref = useRef(null)
    const inView = useInView(ref, { once, margin: "-50px" })

    const variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delayChildren: delay,
                staggerChildren: staggerAmount,
            },
        },
    }

    return (
        <motion.div
            ref={ref}
            variants={variants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className={className}
        >
            {children}
        </motion.div>
    )
}

export function Child({ children, className, yOffset = 30 }) {
    const variants = {
        hidden: { opacity: 0, y: yOffset },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: [0.21, 0.47, 0.32, 0.98]
            }
        },
    }

    return (
        <motion.div variants={variants} className={className}>
            {children}
        </motion.div>
    )
}
