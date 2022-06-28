import {createServer} from "@graphql-yoga/node";
import {importSchema} from "graphql-import";
import resolvers from "./graphql/resolvers";


// Provide your schema
const typeDefs = importSchema('graphql/schema.graphql')
const server = createServer({
	schema: {
		typeDefs,
		resolvers
	}
})

// Start the server and explore http://localhost:4000/graphql
server.start().then(() => console.log("Server started on: http://localhost:4000/graphql"))
