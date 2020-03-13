import React, { Component } from "react";
import { Query } from "react-apollo";

// load queries
import { getBooksQuery } from "./../queries/queries";

class BookList extends Component {
  displayBooks() {
    return (
      <Query query={getBooksQuery}>
        {({ loading, error, data }) => {
          if (loading) return <div>loading</div>;

          if (error) return <div>error</div>;

          return data.books.map(book => {
            return <li key={book.id}>{book.name}</li>;
          });
        }}
      </Query>
    );
  }

  render() {
    return (
      <div>
        <ul id="book-list">{this.displayBooks()}</ul>
      </div>
    );
  }
}

export default BookList;
