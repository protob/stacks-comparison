import * as Lucide from 'lucide-react'
import clsx from 'clsx'

interface Props {
  name: keyof typeof Lucide
  className?: string
}

export function Icon({ name, className }: Props) {
  const IconComponent = Lucide[name]
  return <IconComponent className={clsx('h-4 w-4', className)} />
}
