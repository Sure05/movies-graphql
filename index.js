import {importSchema} from "graphql-import";
import resolvers from "./graphql/resolvers";
import express from 'express'
import { createServer } from '@graphql-yoga/node'

const app = express()

const typeDefs = importSchema('graphql/schema.graphql')
const graphQLServer = createServer({
	schema: {
		typeDefs,
		resolvers
	}
})

// Bind GraphQL Yoga to `/graphql` endpoint
app.use('/graphql', graphQLServer)

app.listen(4000, () => {
	console.log('Running a GraphQL API server at http://192.168.31.72:4000/graphql')
})
