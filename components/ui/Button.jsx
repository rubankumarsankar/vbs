import clsx from 'clsx'

const variants = {
    primary:
        'bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800 shadow-lg shadow-primary-500/20',
    secondary:
        'bg-white text-primary-700 border border-primary-200 hover:bg-primary-50 active:bg-primary-100',
    ghost: 'text-primary-700 hover:bg-primary-50 active:bg-primary-100',
}

const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
}

export default function Button({
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    href,
    ...props
}) {
    const base =
        'inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 cursor-pointer'

    const classes = clsx(base, variants[variant], sizes[size], className)

    if (href) {
        return (
            <a href={href} className={classes}>
                {children}
            </a>
        )
    }

    return (
        <button className={classes} {...props}>
            {children}
        </button>
    )
}
