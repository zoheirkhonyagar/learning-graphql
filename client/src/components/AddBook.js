import React, { Component } from "react";
import { Query } from "react-apollo";

// load queries
import { getAuthorsQuery } from "./../queries/queries";

class AddBook extends Component {
  getAuthors() {
    return (
      <Query query={getAuthorsQuery}>
        {({ loading, error, data }) => {
          if (loading) return <option disabled>loading</option>;

          if (error) return <option disabled>error</option>;

          return data.authors.map(author => {
            return (
              <option key={author.id} value={author.id}>
                {author.name}
              </option>
            );
          });
        }}
      </Query>
    );
  }

  render() {
    return (
      <from id="add-book">
        <div className="field">
          <label>Book name:</label>
          <input type="text" />
        </div>

        <div className="field">
          <label>Genre:</label>
          <input type="text" />
        </div>

        <div className="field">
          <label>Author:</label>
          <select>
            <option>Select Author</option>
            {this.getAuthors()}
          </select>
        </div>
        <button>+</button>
      </from>
    );
  }
}

export default AddBook;
