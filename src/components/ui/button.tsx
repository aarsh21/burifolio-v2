import * as React from 'react'
import { Slot as SlotPrimitive } from 'radix-ui'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-bold uppercase tracking-wide transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border-2 border-foreground",
  {
    variants: {
      variant: {
        default:
          'bg-foreground text-background hover:bg-foreground/90 shadow-brutal-sm hover:shadow-brutal active:shadow-none active:translate-x-0.5 active:translate-y-0.5',
        destructive:
          'bg-destructive text-white hover:bg-destructive/90 border-destructive',
        outline:
          'bg-background hover:bg-accent hover:text-accent-foreground shadow-brutal-sm hover:shadow-brutal active:shadow-none active:translate-x-0.5 active:translate-y-0.5',
        secondary:
          'bg-muted text-foreground hover:bg-muted/80 shadow-brutal-sm hover:shadow-brutal active:shadow-none active:translate-x-0.5 active:translate-y-0.5',
        ghost: 'border-transparent hover:bg-muted hover:border-foreground',
        link: 'border-transparent text-foreground underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-5 py-2',
        sm: 'h-8 gap-1.5 px-3 text-xs',
        lg: 'h-12 px-8',
        icon: 'size-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? SlotPrimitive.Root : 'button'

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
