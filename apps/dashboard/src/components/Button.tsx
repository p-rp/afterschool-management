import type { ButtonHTMLAttributes } from 'react'
import { forwardRef } from 'react'
import { cn } from '../utils/cn'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' | 'accent' | 'navy'
  size?: 'default' | 'sm' | 'lg' | 'xl' | 'icon'
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    return (
      <button
        className={cn(
          'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hsl(var(--ring)) focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
          {
            'bg-hsl(var(--primary)) text-hsl(var(--primary-foreground)) hover:bg-hsl(var(--primary)) hover:opacity-90': variant === 'default',
            'bg-hsl(var(--destructive)) text-hsl(var(--destructive-foreground)) hover:bg-hsl(var(--destructive)) hover:opacity-90': variant === 'destructive',
            'border border-hsl(var(--input)) bg-hsl(var(--background)) hover:bg-hsl(var(--accent)) hover:text-hsl(var(--accent-foreground))': variant === 'outline',
            'bg-hsl(var(--secondary)) text-hsl(var(--secondary-foreground)) hover:bg-hsl(var(--secondary)) hover:opacity-80': variant === 'secondary',
            'hover:bg-hsl(var(--accent)) hover:text-hsl(var(--accent-foreground))': variant === 'ghost',
            'text-hsl(var(--primary)) underline-offset-4 hover:underline': variant === 'link',
            'bg-[hsl(0,100%,60%)] text-white hover:opacity-90 shadow-[0_4px_20px_-2px_hsl(0,100%,60%/0.4)] hover:shadow-lg hover:-translate-y-0.5': variant === 'accent',
            'bg-hsl(var(--brand-navy)) text-hsl(var(--primary-foreground)) hover:bg-hsl(var(--brand-navy-light)) shadow-brand': variant === 'navy',
          },
          {
            'h-10 px-4 py-2': size === 'default',
            'h-9 rounded-md px-3': size === 'sm',
            'h-12 rounded-lg px-8 text-base': size === 'lg',
            'h-14 rounded-lg px-10 text-lg': size === 'xl',
            'h-10 w-10': size === 'icon',
          },
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)

Button.displayName = 'Button'

export { Button }
