const { GraphQLObjectType, GraphQLString, GraphQLSchema } = require("graphql");
const _ = require("lodash");

// dummy data
const books = [
  { name: "book1", genre: "Fantasy", id: "1" },
  { name: "book2", genre: "Fantasy", id: "2" },
  { name: "book3", genre: "Science", id: "3" }
];

// define book type
const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    genre: { type: GraphQLString }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: {
        id: { type: GraphQLString }
      },
      resolve(parent, args) {
        // code to get data from db / other source
        // for relationships
        return _.find(books, { id: args.id });
      }
    }
  }
});

module.exports = {
  schema: new GraphQLSchema({ query: RootQuery })
};
