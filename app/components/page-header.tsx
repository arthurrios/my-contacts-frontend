import { Link } from 'react-router'
import arrow from './../assets/images/arrow.svg'

interface PageHeaderProps {
  title: string
}

export function PageHeader({ title }: PageHeaderProps) {
  return (
    <header className="mb-6">
      <Link to="/" className="flex items-center gap-2">
        <img src={arrow} alt="Back" className="transform -rotate-90" />
        <span className="text-primary-main font-semibold">Go back</span>
      </Link>
      <h1 className="text-2xl font-bold">{title}</h1>
    </header>
  )
}
