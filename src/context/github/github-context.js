import { createContext, useReducer } from "react";
import GithubReducer from "./githubReducer";
const GithubContext = createContext();

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_KEY;

export const GithubProvider = ({ children }) => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(GithubReducer, initialState);

  const searchResults = async (text) => {
    setLoading();
    const params = new URLSearchParams({
      q: text,
    });
    const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });
    const { items } = await response.json();

    dispatch({
      type: "GET_USERS",
      payload: items,
    });
  };
  // search a single user
  const getUser = async (login) => {
    setLoading();
 
    const response = await fetch(`${GITHUB_URL}/users/${login}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });

    if(response.status === 404) {
      window.location = '/notfound'
    } else {
      const data = await response.json();

      dispatch({
        type: "GET_USER",
        payload: data,
      });
    }

  };
  const getUserRepos = async (login) => {
    const response = await fetch(`${GITHUB_URL}/users/${login}/repos`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });
    const repos = await response.json();

    dispatch({
      type: "GET_USER_REPOS",
      payload: repos
    });
  }
  const clearSearch = () => {
    dispatch({ type: "CLEAR_SEARCH" });
  };
  const setLoading = () => dispatch({ type: "SET_LOADING" });
  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        isLoading: state.loading,
        searchResults,
        clearSearch,
        getUser,
        getUserRepos,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
