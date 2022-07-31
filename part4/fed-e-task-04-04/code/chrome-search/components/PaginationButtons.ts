import Link from "next/link";
import { useRouter } from "next/router";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";

const PaginationButtons = () => {
	const router = useRouter();
	const startIndex = Number(router.query.start) || 0; // Defining where pagination starts, default of 0
	// router is a variable that is used to access the current route.
	// router.query.start is a variable that is used to access the query string parameter start.
	// router.query.start is a string, so we need to convert it to a number.
	// If the query string parameter start is not defined, then startIndex will be 0.
	// If the query string parameter start is defined, then startIndex will be the value of the query string parameter start.

	return (
		<div className="flex justify-between max-w-lg text-blue-700 mb-10">
			{startIndex >= 10 && ( // If startIndex is greater than or equal to 10, then show the previous button
				<Link
					href={`/search?term=${router.query.term}&start=${startIndex - 100}`} // Link to the previous page, will display the previous 100 results
				>
					<div className="flex flex-grow flex-col items-center cursor-pointer hover:underline">
						<ChevronLeftIcon className="h-5" />
						<p>Previous</p>
					</div>
				</Link>
			)}
			<Link
				href={`/search?term=${router.query.term}&start=${startIndex + 100}`} // Link to the next page, will display the next 100 results
			>
				<div className="flex flex-grow flex-col items-center cursor-pointer hover:underline">
					<ChevronRightIcon className="h-5" />
					<p>Next</p>
				</div>
			</Link>
		</div>
	);
};

export default PaginationButtons;
