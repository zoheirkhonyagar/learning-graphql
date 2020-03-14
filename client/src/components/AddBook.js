import React, { useState } from "react";

// load queries
import { getAuthorsQuery, addBookMutation } from "./../queries/queries";

const AddBook = props => {
  const [currentState, setState] = useState({
    name: "",
    genre: "",
    authorId: ""
  });

  // const getAuthors = () => {
  //   return (
  //     <Query query={getAuthorsQuery}>
  //       {({ loading, error, data }) => {
  //         if (loading) return <option disabled>loading</option>;

  //         if (error) return <option disabled>error</option>;

  //         return data.authors.map(author => {
  //           return (
  //             <option key={author.id} value={author.id}>
  //               {author.name}
  //             </option>
  //           );
  //         });
  //       }}
  //     </Query>
  //   );
  // };

  let form = (
    <form
      id="add-book"
      onSubmit={e => {
        e.preventDefault();
      }}
    >
      <div className="field">
        <label>Book name:</label>
        <input type="text" onChange={e => setState({ name: e.target.value })} />
      </div>

      <div className="field">
        <label>Genre:</label>
        <input
          type="text"
          onChange={e => setState({ genre: e.target.value })}
        />
      </div>

      <div className="field">
        <label>Author:</label>
        <select onChange={e => setState({ authorId: e.target.value })}>
          <option>Select Author</option>
          {getAuthors()}
        </select>
      </div>
      <button>+</button>
    </form>
  );
  return form;
};

export default AddBook;
