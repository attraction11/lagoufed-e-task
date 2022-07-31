import Head from "next/head";
import Header from "../components/Header";
import { API_KEY, CONTEXT_KEY } from "../keys";
import Response from "../Response";
import { useRouter } from "next/router";
import SearchResults from "../components/SearchResults";

const Search = ({ results }) => {
	// Router for search redirect
	const router = useRouter();
	console.log(results);

	return (
		<div>
			<Head>
				<title>{router.query.term} - Google Search</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Header />
			<SearchResults results={results} />
		</div>
	);
};

export default Search;
export async function getServerSideProps(context) {
	const useDummyData = false; // "Mock data" => set to true while developing to not exhaust API usage
	const startIndex = context.query.start || "0"; // Defining where pagination starts, default of 0
	const data = useDummyData
		? Response
		: await fetch(
				`https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CONTEXT_KEY}&q=${context.query.term}&start=${startIndex}`,
		  ).then((response) => response.json()); // Fetching the data from the API
	// After the SERVER has rendered, pass results to client
	return {
		props: {
			results: data, // Pass the data to the client
		},
	};
}
