
import { getMovies, getMovie, getSuggestions } from "./db";
import {loginByEmailPassword} from "./db/user";

const resolvers = {
	Query: {
		movies: (_, { page }) => getMovies(page),
		movie: (_, { id }) => getMovie(id),
		suggestions: (_, { id }) => getSuggestions(id),
	},
	Mutation: {
		login: (_, {email, password}) => loginByEmailPassword(email, password)
	}
};

export default resolvers;
