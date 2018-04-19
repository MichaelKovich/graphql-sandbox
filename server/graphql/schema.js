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
    };
  },
});

module.exports = new GraphQLSchema({
  query: Query,
});
