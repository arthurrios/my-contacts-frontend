import logo from '../../assets/images/logo.svg'

export function Header() {
  return (
    <div className="mt-18 mb-12 flex justify-center flex-col items-center">
      <img src={logo} alt="MyContacts" className="w-50" />
    </div>
  )
}
