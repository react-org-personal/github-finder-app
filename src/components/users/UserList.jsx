import React, {  useContext } from "react";
import Spinner from "../layout/Spinner";
import UserItem from "./UserItem";
import GithubContext from "../../context/github/github-context";

function UserResults() {
  const { users, isLoading } = useContext(GithubContext);



  const userData = users.map((user) => <UserItem user={user} />);

  return (
    <div className="grid gird-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
      {isLoading ? <Spinner /> : userData}
    </div>
  );
}

export default UserResults;
