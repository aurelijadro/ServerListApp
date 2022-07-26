import React, { useState, useEffect, useCallback } from "react";
import "./Login.scss";

type LoginProps = {
  onSubmit: (username: string, password: string) => void;
  loginError: string;
};

export const Login = ({ onSubmit, loginError }: LoginProps) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoginDataValid, setIsLoginDataValid] = useState(false);

  const validateLogin = useCallback(() => {
    let isValid = true;
    if (username === "" || password === "") {
      isValid = false;
    }
    return isValid;
  }, [username, password]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateLogin()) {
      onSubmit(username, password);
    }
  };

  const onInputChange = (additionalFunctionality?: any) => {
    additionalFunctionality && additionalFunctionality();
    setIsLoginDataValid(validateLogin());
  };

  useEffect(() => {
    setIsLoginDataValid(validateLogin());
  }, [username, password, validateLogin]);

  return (
    <div className="login-page">
      <form onSubmit={(e) => submit(e)}>
        <input
          placeholder="Username"
          className="login-input"
          type="text"
          id="username"
          name="username"
          required
          autoComplete="off"
          onChange={(event) => onInputChange(setUsername(event?.target.value))}
        ></input>

        <input
          className="login-input"
          placeholder="Password"
          type="password"
          id="password"
          name="password"
          required
          autoComplete="off"
          onChange={(event) => onInputChange(setPassword(event?.target.value))}
        ></input>
        <p className="login-error">{loginError}</p>
        <button type="submit" disabled={!isLoginDataValid}>
          LOGIN
        </button>
      </form>
    </div>
  );
};
