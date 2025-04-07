import magnifierQuestion from '../../../assets/images/magnifier-question.svg'

interface SearchNotFoundProps {
  searchTerm: string
}

export function SearchNotFound({ searchTerm }: SearchNotFoundProps) {
  return (
    <div className="flex items-start gap-6">
      <img src={magnifierQuestion} alt="Magnifier question" />

      <span className="text-gray-200 font-semibold break-all">
        {`Nenhum resultado foi encontrado para ”${searchTerm}”.`}
      </span>
    </div>
  )
}
