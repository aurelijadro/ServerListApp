import React from "react";
import "./App.scss";
import { useAppSelector, useAppDispatch } from "./app/hooks";
import { Login } from "./components/Login/Login";
import { selectToken, assignToken } from "./app/authorizationSlice";
import { NavBar } from "./components/NavBar/NavBar";
import { getAuthorizationToken } from "./app/api";
import { ServerList } from "./components/ServerList/ServerList";

function App() {
  const token = useAppSelector(selectToken);
  const dispatch = useAppDispatch();

  const onSubmit = (username: string, password: string) => {
    getAuthorizationToken(username, password)
      .then((response) => response.json())
      .then((data) => dispatch(assignToken(data.token)));

    // TODO: introduce server error handling
  };

  return (
    <div className="app-container">
      <NavBar iSLoggedIn={!!token} />
      {token ? <ServerList /> : <Login onSubmit={onSubmit} />}
    </div>
  );
}

export default App;
