const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} = require('graphql');
const axios = require('axios');

const users = require(`${__dirname}/model`);

const BASE_URL = 'http://www.swapi.co';

const getFilms = url =>
  axios
    .get(url)
    .then(response => response.data)
    .catch(err => console.log(err));

const PersonType = new GraphQLObjectType({
  name: 'Person',
  fields() {
    return {
      id: {
        // GraphQLNonNull: Requires all people to have a non-null ID property.
        type: GraphQLNonNull(GraphQLInt), // the type of the property
        resolve(person) {
          // Data Aggregation; tells id what value it contains
          return person.id;
        },
      },
      name: {
        type: GraphQLString,
        resolve(person) {
          return person.name;
        },
      },
      height: {
        type: GraphQLInt,
        resolve(person) {
          return person.height;
        },
      },
      films: {
        type: new GraphQLList(MovieType),
        resolve(person) {
          return person.films[0] ? person.films.map(getFilms) : [];
        },
      },
    };
  },
});

const MovieType = new GraphQLObjectType({
  name: 'Movie',
  fields() {
    return {
      title: {
        type: GraphQLString,
        resolve(movie) {
          return movie.title;
        },
      },
      releaseDate: {
        type: GraphQLString,
        resolve(movie) {
          // movie is simply the object that will be passed in and has title and release_date properties
          return movie.release_date;
        },
      },
    };
  },
});

const Query = new GraphQLObjectType({
  name: 'Query',
  fields() {
    return {
      people: {
        type: new GraphQLNonNull(GraphQLList(GraphQLNonNull(PersonType))), // type of the data being returned
        resolve(root, args) {
          // sometimes root will be represented as _, a non-null placeholder
          return users;
        },
      },
      person: {
        type: PersonType,
        args: {
          id: {type: GraphQLNonNull(GraphQLInt)},
        },
        resolve(root, args) {
          return users.filter(user => user.id === args.id)[0];
          // database call here if we were working with an actual DB
        },
      },
    };
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields() {
    return {
      addPerson: {
        type: PersonType,
        args: {
          id: {type: GraphQLNonNull(GraphQLInt)},
          name: {type: GraphQLString},
          height: {type: GraphQLInt},
          films: {type: new GraphQLList(GraphQLString)},
        },
        resolve(root, args) {
          users.push({...args});
          return users[users.length - 1];
        },
      },
      deletePerson: {
        type: GraphQLInt, // because that's what we're sending back
        args: {
          id: {type: GraphQLNonNull(GraphQLInt)},
        },
        resolve(root, args) {
          users = users.filter(user => user.id !== args.id);
          return args.id;
        },
      },
    };
  },
});

module.exports = new GraphQLSchema({
  query: Query,
  mutation: Mutation,
});
