import React, { useState, useContext } from "react";
import GithubContext from "../../context/github/github-context";
import AlertContext from "../../context/alert/AlertContext";
import {searchResults} from '../../context/github/githubActions';

function UserSearch() {
  const [text, setText] = useState("");
  const { users, dispatch } = useContext(GithubContext);
  const {setAlert} = useContext(AlertContext);
  const inputHandler = (event) => {
    setText(event.target.value);
  };

  const submitHandler = async(event) => {
    event.preventDefault();
    if (text === "") {
      setAlert("Please enter something", 'error');
    } else {
      dispatch({type: 'SET_LOADING'});
        const users = await searchResults(text);
        dispatch({type: 'GET_USERS', payload: users});
       
      setText("");
    }
  };

  const clearBtnHandler = () => {
      dispatch({type: 'CLEAR_SEARCH'});
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
