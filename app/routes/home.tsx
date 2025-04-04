import { Link } from 'react-router';
import arrow from './../assets/images/arrow.svg';
import edit from './../assets/images/edit.svg';
import trash from './../assets/images/trash.svg';
import { Modal } from '~/components/modal';

export default function Home() {
	return (
		<>
			<div className="w-full">
				<input
					type="text"
					placeholder="Search contact..."
					className="w-full bg-white border-none rounded-3xl h-12.5 shadow-md outline-0 px-4 placeholder:text-gray-200"
				/>
			</div>
			<div className="mt-8 flex flex-col gap-4">
				<div className="flex justify-between items-center">
					<strong className="text-gray-800 text-2xl">3 contacts</strong>
					<Link
						to="/new-contact"
						className="text-base text-primary-main decoration-0 font-bold border-2 px-4 py-2 rounded-sm hover:bg-primary-main hover:text-white transition-all duration-200 ease-in-out"
					>
						New contact
					</Link>
				</div>

				<div className="w-full h-0.5 bg-gray-200" />

				<div>
					<header className="mb-2">
						<button type="button" className="flex gap-2 items-center">
							<span className="font-bold text-primary-main">Name</span>
							<img src={arrow} alt="Arrow icon" />
						</button>
					</header>

					<div className="flex flex-col gap-4">
						<div className="bg-white flex items-center justify-between shadow-md p-4 rounded-sm">
							<div>
								<div className="flex items-center gap-2">
									<strong>Arthur Rios</strong>
									<small className="bg-primary-lighter text-primary-main font-bold uppercase p-1 rounded-sm">
										instagram
									</small>
								</div>
								<span className="block text-sm text-gray-200">
									arthur@email.com
								</span>
								<span className="block text-sm text-gray-200">
									(61) 99999-9999
								</span>
							</div>

							<div className="flex items-center gap-2">
								<Link to="/edit-contact/1">
									<img src={edit} alt="Edit icon" />
								</Link>
								<button type="button" className="bg-transparent border-none">
									<img src={trash} alt="Trash icon" />
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Modal buttonLabel="Delete" danger />
		</>
	);
}
