import React, { useState, useContext } from "react";
import GithubContext from "../../context/github/github-context";

function UserSearch() {
  const [text, setText] = useState("");
  const { users, searchResults, clearSearch } = useContext(GithubContext);
  const inputHandler = (event) => {
    setText(event.target.value);
  };

  const submitHandler = async(event) => {
    event.preventDefault();
    if (text === "") {
      alert("Please enter something");
    } else {
        searchResults(text);
       
      setText("");
    }
  };

  const clearBtnHandler = () => {
      clearSearch();
  }
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 mb-8 gap-8">
      <div>
        <form onSubmit={submitHandler}>
          <div className="form-control">
            <div className="relative">
              <input
                type="text"
                className="w-full pr-40 bg-gray-200 input input-lg text-black"
                value={text}
                onChange={inputHandler}
                placeholder="Search"
              />
              <button
                type="submit"
                className="absolute top-0 right-0 rounded-1-none w-36 btn btn-lg"
              >
                Go
              </button>
            </div>
          </div>
        </form>
      </div>
      <div>
        {users.length > 0 ? (
          <button type="submit" className="btn btn-ghost btn-lg" onClick={clearBtnHandler}>
            Clear
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default UserSearch;
