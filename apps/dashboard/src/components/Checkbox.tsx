import type { ComponentProps } from 'react'
import { forwardRef } from 'react'
import { Check } from 'lucide-react'
import { cn } from '../utils/cn'

const Checkbox = forwardRef<HTMLInputElement, ComponentProps<'input'>>(
  ({ className, ...props }, ref) => {
    return (
      <div className="relative inline-flex items-center">
        <input
          type="checkbox"
          className={cn(
            'peer h-4 w-4 shrink-0 rounded-sm border border-[hsl(210,20%,40%)] bg-white text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(0,100%,60%)] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none checked:bg-[hsl(0,100%,60%)] checked:border-[hsl(0,100%,60%)]',
            className
          )}
          ref={ref}
          {...props}
        />
        <Check className="pointer-events-none absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 transition-opacity peer-checked:opacity-100" />
      </div>
    )
  }
)

Checkbox.displayName = 'Checkbox'

export { Checkbox }
