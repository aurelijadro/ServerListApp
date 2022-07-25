import React, { useState, useEffect } from "react";
import "./App.scss";
import { useAppSelector, useAppDispatch } from "./app/hooks";
import { Login } from "./components/Login/Login";
import { selectToken, assignToken } from "./app/authorizationSlice";
import { NavBar } from "./components/NavBar/NavBar";
import { getAuthorizationToken } from "./app/api";
import { ServerList } from "./components/ServerList/ServerList";

function App() {
  useEffect(() => {
    dispatch(assignToken(sessionStorage.getItem("token") || ""));
  });
  const token = useAppSelector(selectToken);
  const dispatch = useAppDispatch();

  const [loginError, setLoginError] = useState<string>("");

  const onSubmit = (username: string, password: string) => {
    getAuthorizationToken(username, password)
      .then((response) => {
        console.log(response);
        if (!response.ok) {
          throw Error("Login failed. Check your credetials and try again.");
        }
        setLoginError("");
        return response.json();
      })
      .then((data) => {
        dispatch(assignToken(data.token));
        sessionStorage.setItem("token", data.token);
      })
      .catch((error) => setLoginError(error.message));
  };

  return (
    <div className="app-container">
      <NavBar iSLoggedIn={!!token} />
      {token ? (
        <ServerList />
      ) : (
        <Login onSubmit={onSubmit} loginError={loginError} />
      )}
    </div>
  );
}

export default App;
