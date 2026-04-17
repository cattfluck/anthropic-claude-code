interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
}

export function Button({ variant = 'primary', className = '', children, ...props }: ButtonProps) {
  const base = 'px-4 py-2 rounded-lg font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-mountain-dark disabled:opacity-50 disabled:cursor-not-allowed'
  const variants = {
    primary: 'bg-blue-600 hover:bg-blue-500 text-white focus:ring-blue-500',
    secondary: 'bg-slate-600 hover:bg-slate-500 text-white focus:ring-slate-500',
    ghost: 'bg-transparent hover:bg-slate-700 text-slate-300 focus:ring-slate-500',
  }
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  )
}
