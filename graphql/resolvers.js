
import { getMovies, getMovie, getSuggestions } from "./db";

const resolvers = {
	Query: {
		movies: (_, { page }) => getMovies(page),
		movie: (_, { id }) => getMovie(id),
		suggestions: (_, { id }) => getSuggestions(id),
	},
};

export default resolvers;
