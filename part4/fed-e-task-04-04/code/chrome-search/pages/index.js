import Head from "next/head";
import Avatar from "../components/Avatar";
import { MicrophoneIcon, ViewGridIcon } from "@heroicons/react/solid";
import { SearchIcon } from "@heroicons/react/outline";
import Image from "next/image";
import Footer from "../components/Footer";
import { useRef } from "react";
import { useRouter } from "next/router";

export default function Home() {
	// Router for search redirect
	const router = useRouter();

	// Connecting a reference to search input value for user to load a new search term
	const searchInputRef = useRef(null);

	// Search button functionality
	const search = (e) => {
		e.preventDefault();
		const term = searchInputRef.current.value; // Get value from input field

		if (!term) return; // No action if there is no input
		router.push(`/search?term=${term}`); // Redirect to search page based on input value
	};

	return (
		<div className="flex flex-col items-center justify-center h-screen">
			<Head>
				<title>Google Rebuild</title>
				<meta
					name="description"
					content="A search engine inspired by Google created by Nick Mezacapa"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			{/* Header */}
			<header className="flex w-full p-5 justify-between text-sm text-gray-700">
				<div className="flex space-x-4 items-center">
					<p className="link">About</p>
					<p className="link">Store</p>
				</div>
				<div className="flex space-x-4 items-center">
					<p className="link">Gmail</p>
					<p className="link">Images</p>
					<ViewGridIcon className="h-10 w-10 p-2 rounded-full hover:bg-gray-100 cursor-pointer" />
					<Avatar url="https://media-exp1.licdn.com/dms/image/C4D03AQGvWyWEG-sKvg/profile-displayphoto-shrink_800_800/0/1581563525080?e=1654732800&v=beta&t=W8amLyR0Gc_zs6z013EHI_fA01uMpLAuASSrKHdcMbA" />
				</div>
			</header>

			{/* Body */}
			<form className="flex flex-col items-center mt-44 flex-grow w-4/5">
				<Image
					src="https://www.google.co.uk/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
					height={100}
					width={300}
				/>
				<div className="flex w-full mt-5 hover:shadow-lg focus-within:shadow-lg max-w-md rounded-full border border-gray-200 px-5 py-3 items-center sm:max-w-xl lg:max-w-2xl">
					<SearchIcon className="h-5 mr-3 text-gray-500" />
					<input
						ref={searchInputRef} // Connecting a reference to search input value for user to load a new search term
						type="text"
						className="focus:outline-none flex-grow"
					/>
					<MicrophoneIcon className="h-5 mr-3 text-gray-500" />
				</div>

				<div className="flex flex-col w-1/2 space-y-2 justify-center mt-8 sm:space-y-0 sm:flex-row sm:space-x-4">
					<button onClick={search} className="btn">
						Google Search
					</button>
					<button onClick={search} className="btn">
						I'm Feeling Lucky
					</button>
				</div>
			</form>

			{/* Footer */}
			<Footer />
		</div>
	);
}
