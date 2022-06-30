import {importSchema} from "graphql-import";
import resolvers from "./graphql/resolvers";
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import express from 'express';
import http from 'http';


// // Provide your schema
// const typeDefs = importSchema('graphql/schema.graphql')
// const app = express();
// const server = createServer({
// 	schema: {
// 		typeDefs,
// 		resolvers
// 	}
// })
//
// // Start the server and explore http://localhost:4000/graphql
// server.start().then(() => console.log("Server started on: http://localhost:4000/graphql"))

async function startApolloServer(typeDefs, resolvers) {
	const app = express();
	const httpServer = http.createServer(app);
	const server = new ApolloServer({
		typeDefs,
		resolvers,
		csrfPrevention: true,
		cache: 'bounded',
		plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
	});
	
	await server.start();
	server.applyMiddleware({ app });
	await new Promise(resolve => httpServer.listen({ port: 4000 }, resolve));
	console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}
const typeDefs = importSchema('graphql/schema.graphql')
startApolloServer(typeDefs, resolvers)
