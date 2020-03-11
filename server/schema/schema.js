const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
  GraphQLID
} = require("graphql");
const _ = require("lodash");

// dummy data
const books = [
  { name: "book1", genre: "Fantasy", id: "1", authorId: "1" },
  { name: "book2", genre: "Fantasy", id: "2", authorId: "2" },
  { name: "book3", genre: "Science", id: "3", authorId: "3" }
];

const authors = [
  { name: "author1", age: 50, id: "1" },
  { name: "author2", age: 35, id: "2" },
  { name: "author3", age: 40, id: "3" }
];

// define authors type
const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt }
  })
});

// define book type
const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        return _.find(authors, { id: parent.authorId });
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(parent, args) {
        // code to get data from db / other source
        // for relationships
        console.log(typeof args.id);
        return _.find(books, { id: args.id });
      }
    },
    author: {
      type: AuthorType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(parent, args) {
        return _.find(authors, { id: args.id });
      }
    }
  }
});

module.exports = {
  schema: new GraphQLSchema({ query: RootQuery })
};
