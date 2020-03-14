import React, { useState } from "react";
import { useQuery, useMutation } from "react-apollo";

// load queries
import { getAuthorsQuery, addBookMutation } from "./../queries/queries";

const AddBook = props => {
  const [state, setState] = useState({
    name: "",
    genre: "",
    authorId: ""
  });

  const [addBook, createdBook = { data }] = useMutation(addBookMutation);

  const { data, loading, error } = useQuery(getAuthorsQuery);

  if (loading) return <option disabled>loading</option>;

  if (error) return <option disabled>error</option>;

  const getAuthors = data => {
    return data.authors.map(author => {
      return (
        <option key={author.id} value={author.id}>
          {author.name}
        </option>
      );
    });
  };

  const formSubmitHandler = e => {
    e.preventDefault();
    const { name, genre, authorId } = state;
    addBook({ variables: { name, genre, authorId } }).then(reslut => {
      console.log(reslut);
    });
  };

  let form = (
    <form id="add-book" onSubmit={formSubmitHandler.bind(this)}>
      <div className="field">
        <label>Book name:</label>
        <input
          type="text"
          onChange={e => setState({ ...state, name: e.target.value })}
        />
      </div>

      <div className="field">
        <label>Genre:</label>
        <input
          type="text"
          onChange={e => setState({ ...state, genre: e.target.value })}
        />
      </div>

      <div className="field">
        <label>Author:</label>
        <select
          onChange={e => setState({ ...state, authorId: e.target.value })}
        >
          <option>Select Author</option>
          {getAuthors(data)}
        </select>
      </div>
      <button>+</button>
    </form>
  );
  return form;
};

export default AddBook;
