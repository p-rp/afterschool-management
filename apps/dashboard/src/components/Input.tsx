import type { InputHTMLAttributes } from 'react'
import { forwardRef } from 'react'
import { cn } from '../utils/cn'

const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-10 w-full rounded-md border border-hsl(var(--input)) bg-hsl(var(--background)) px-3 py-2 text-base placeholder:text-hsl(var(--muted-foreground)) focus-visible:outline-none focus-visible:border-[#ff3131] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)

Input.displayName = 'Input'

export { Input }
