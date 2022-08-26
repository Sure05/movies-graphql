import axios from "axios";
const BASE_URL = "https://yts.mx/api/v2/";
const LIST_MOVIES_URL = `${BASE_URL}list_movies.json`;
const MOVIE_DETAILS_URL = `${BASE_URL}movie_details.json`;
const MOVIE_SUGGESTIONS_URL = `${BASE_URL}movie_suggestions.json`;

export const getMovies = async (page) => {
	const {
		data: {
			data: { movies, movie_count, page_number },
		},
	} = await axios(LIST_MOVIES_URL, {
		params: {
			limit: 20,
			page,
		},
	});
	const info = {
		pages: page_number,
	}
	info.count = parseInt((movie_count / 20)) + (movie_count % 20 > 0);
	if(page_number < info.count) info.next = page_number + 1;
	if(page_number > 1) info.prev = page_number - 1;
	console.log(info);
	return {
		info,
		results: movies
	};
};

export const getMovie = async (id) => {
	const {
		data: {
			data: { movie },
		},
	} = await axios(MOVIE_DETAILS_URL, {
		params: {
			movie_id: id,
		},
	});
	return movie;
};

export const getSuggestions = async (id) => {
	const {
		data: {
			data: { movies },
		},
	} = await axios(MOVIE_SUGGESTIONS_URL, {
		params: {
			movie_id: id,
		},
	});
	return movies;
};
