const _ = require("lodash");
const Book = require("./../models/book");
const Author = require("./../models/author");

const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLID
} = require("graphql");

// dummy data
const books = [
  { name: "book1", genre: "Fantasy", id: "1", authorId: "1" },
  { name: "book2", genre: "Fantasy", id: "2", authorId: "2" },
  { name: "book3", genre: "Science", id: "3", authorId: "3" },
  { name: "book4", genre: "Computer", id: "4", authorId: "2" },
  { name: "book5", genre: "Art", id: "5", authorId: "3" },
  { name: "book6", genre: "Science", id: "6", authorId: "3" }
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
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return _.filter(books, { authorId: parent.id });
      }
    }
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
    },
    books: {
      type: GraphQLList(BookType),
      resolve(parent, args) {
        return books;
      }
    },
    authors: {
      type: GraphQLList(AuthorType),
      resolve(parent, args) {
        return authors;
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: GraphQLString },
        age: { type: GraphQLInt }
      },
      resolve(parent, args) {
        //execute args
        const { name, age } = args;

        // create author
        let author = new Author({
          name,
          age
        });

        // save to db
        author.save();
      }
    }
  }
});

module.exports = {
  schema: new GraphQLSchema({ query: RootQuery, mutation: Mutation })
};
