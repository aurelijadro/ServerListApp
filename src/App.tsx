import React from "react";
import "./App.scss";
import { useAppSelector, useAppDispatch } from "./app/hooks";
import { LoginPage } from "./components/Login/Login";
import { selectToken, assignToken, resetToken } from "./app/authorizationSlice";
import { NavBar } from "./components/NavBar/NavBar";

function App() {
  const token = useAppSelector(selectToken);
  const dispatch = useAppDispatch();

  const onSubmit = (username: string, password: string) => {
    console.log("submit");
    fetch("https://playground.tesonet.lt/v1/tokens", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => response.json())
      .then((data) => dispatch(assignToken(data.token)));

    // TODO: introduce server error handling
  };

  return (
    <div className="app-container">
      <NavBar iSLoggedIn={!!token} />
      {token ? (
        <div>
          <p>Server List here</p>
        </div>
      ) : (
        <LoginPage onSubmit={onSubmit} />
      )}
    </div>
  );
}

export default App;
