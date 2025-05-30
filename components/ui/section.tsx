import { cn } from "@/lib/utils"
import { HTMLAttributes, forwardRef } from "react"

interface SectionProps extends HTMLAttributes<HTMLElement> {
  tag?: keyof JSX.IntrinsicElements
  innerClassName?: string
}

const Section = forwardRef<HTMLElement, SectionProps>(
  ({ tag: Tag = 'section', className, innerClassName, children, ...props }, ref) => {
    return (
      <Tag ref={ref} className={cn('w-full', className)} {...props}>
        <div className={cn('container mx-auto px-4', innerClassName)}>
          {children}
        </div>
      </Tag>
    )
  }
)

Section.displayName = 'Section'

export { Section }
