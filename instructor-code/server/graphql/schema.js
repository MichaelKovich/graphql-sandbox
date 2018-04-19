const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} = require("graphql");
const axios = require("axios");

let users = require(`${__dirname}/model`);

const PersonType = new GraphQLObjectType({
  name: "Person",
  fields() {
    return {
      id: {
        type: GraphQLNonNull(GraphQLInt),
        resolve(person) {
          return person.id;
        }
      },
      name: {
        type: GraphQLString,
        resolve(person) {
          return person.name;
        }
      },
      height: {
        type: GraphQLInt,
        resolve(person) {
          return person.height;
        }
      }
    };
  }
});

const Query = new GraphQLObjectType({
  name: "Query",
  fields() {
    return {
      people: {
        type: new GraphQLNonNull(GraphQLList(GraphQLNonNull(PersonType))),
        resolve(root, args) {
          return users;
        }
      }
    };
  }
});

module.exports = new GraphQLSchema({
  query: Query
});
