const express = require('express');
const cors = require('cors');
const graphqlHTTP = require('express-graphql');

const schema = require(`${__dirname}/graphql/schema`);

const app = express();
app.use(cors());

// Entry point where we utilize the graphic interface
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  }),
);

// Entry point for React application
app.post(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: false,
  }),
);

const port = 3001;
app.listen(port, console.log(`Dr. Crane is listening on ${port}`));
