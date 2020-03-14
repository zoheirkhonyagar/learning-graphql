import React from "react";
import { useQuery } from "@apollo/react-hooks";

// load queries
import { getBooksQuery } from "./../queries/queries";

const BookList = props => {
  const { loading, error, data } = useQuery(getBooksQuery);

  if (loading) return "Loading...";

  if (error) return `Error! ${error.message}`;

  const getBooks = data => {
    return data.books.map(book => {
      return <li key={book.id}>{book.name}</li>;
    });
  };

  let content = (
    <div>
      <ul id="book-list">{getBooks(data)}</ul>
    </div>
  );

  return content;
};

export default BookList;
