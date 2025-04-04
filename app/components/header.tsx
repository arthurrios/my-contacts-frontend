import logo from './../assets/images/logo.svg';

export function Header() {
	return (
		<div className="mt-18 flex justify-center flex-col items-center">
			<img src={logo} alt="MyContacts" className="w-50" />
			<div className="w-full mt-12">
				<input
					type="text"
					placeholder="Search contact..."
					className="w-full bg-white border-none rounded-3xl h-12.5 shadow-md outline-0 px-4 placeholder:text-gray-200"
				/>
			</div>
		</div>
	);
}
