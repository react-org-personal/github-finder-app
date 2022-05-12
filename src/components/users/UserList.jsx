import React, { useEffect, useState } from "react";
import Spinner from "../layout/Spinner";
import UserItem from "./UserItem";

function UserResults() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    const response = await fetch(`${process.env.REACT_APP_GITHUB_URL}/users`, {
      headers: {
        Authorization: `token ${process.env.REACT_APP_GITHUB_KEY}`,
      },
    });
    const data = await response.json();

    setUsers(data);
    setIsLoading(false);
  };

  const userData = users.map((user) => <UserItem user={user}/>);

  return (
    <div className="grid gird-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
      {isLoading ? <Spinner/> : userData}
    </div>
  );
}

export default UserResults;
