const express = require('express');
const cors = require('cors');
const graphqlHTTP = require('express-graphql');

const schema = require(`${__dirname}/graphql/schema`);

const app = express();
app.use(cors());

// GraphQL
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  }),
);

const port = 3001;
app.listen(port, console.log(`Dr. Crane is listening on ${port}`));
