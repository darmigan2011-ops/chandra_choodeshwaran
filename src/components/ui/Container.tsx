import { cn } from '@/lib/utils'

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: 'div' | 'section' | 'article'
}

export function Container({ className, children, as: Tag = 'div', ...props }: ContainerProps) {
  return (
    <Tag className={cn('mx-auto w-full max-w-[1200px] px-6 md:px-8 lg:px-12', className)} {...props}>
      {children}
    </Tag>
  )
}
