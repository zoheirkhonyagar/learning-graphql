import React from "react";

// load queries
import { getBooksQuery } from "./../queries/queries";

const BookList = props => {
  let content = (
    <div>
      <ul id="book-list"></ul>
    </div>
  );

  return content;
};

export default BookList;
