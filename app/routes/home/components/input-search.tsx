interface InputSearchProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export function InputSearch({ placeholder, ...props }: InputSearchProps) {
  return (
    <div className="w-full">
      <input
        type="text"
        placeholder={placeholder}
        className="w-full bg-white border-none rounded-3xl h-12.5 shadow-md outline-0 px-4 placeholder:text-gray-200"
        {...props}
      />
    </div>
  )
}
