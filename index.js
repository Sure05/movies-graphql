import { loadSchemaSync } from '@graphql-tools/load'
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'
import { addResolversToSchema } from '@graphql-tools/schema';
import resolvers from "./graphql/resolvers";
import express from 'express'
import { createServer } from '@graphql-yoga/node'

const app = express()
const schema = loadSchemaSync('graphql/schema.graphql', { loaders: [new GraphQLFileLoader()] })
const schemaWithResolvers = addResolversToSchema({
	schema,
	resolvers
})
const graphQLServer = createServer({
	schema: schemaWithResolvers
})

// Bind GraphQL Yoga to `/graphql` endpoint
app.use('/graphql', graphQLServer)

app.listen(8080, () => {
	console.log('Running a GraphQL API server at http://192.168.31.72:4000/graphql')
})
