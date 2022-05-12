import { createContext, useReducer } from "react";
import GithubReducer from "./githubReducer";
const GithubContext = createContext();

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_KEY;

export const GithubProvider = ({ children }) => {
    const initialState = {
        users: [],
        loading: true
    }

    const [state, dispatch] = useReducer(GithubReducer, initialState);

  const fetchResults = async () => {
    const response = await fetch(`${GITHUB_URL}/users`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });
    const data = await response.json();

    dispatch({
        type: 'GET_USERS',
        payload: data,
    })

  
  };
  return <GithubContext.Provider value={{
      users: state.users,
      isLoading: state.loading,
      fetchResults
  }}>
      {children}
  </GithubContext.Provider>
};

export default GithubContext;