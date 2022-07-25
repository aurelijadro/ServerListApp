import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Login } from "./Login";

test("it should display input fields for username and password and login button", () => {
  const onSubmit = jest.fn();
  render(<Login onSubmit={onSubmit} loginError="" />);

  expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /login/i })).toBeDisabled();
});

test("it should display error message if it is passed", () => {
  const onSubmit = jest.fn();
  render(<Login onSubmit={onSubmit} loginError="There's an error" />);

  expect(screen.getByText("There's an error")).toBeInTheDocument();
});

test("it should enable login button when username and password fields are filled", () => {
  const onSubmit = jest.fn();
  render(<Login onSubmit={onSubmit} loginError="" />);

  const usernameInput = screen.getByPlaceholderText("Username");
  const passwordInput = screen.getByPlaceholderText("Password");

  fireEvent.change(usernameInput, { target: { value: "username" } });
  expect(usernameInput).toHaveValue("username");
  expect(screen.getByRole("button", { name: /login/i })).toBeDisabled();

  fireEvent.change(passwordInput, { target: { value: "password" } });
  expect(passwordInput).toHaveValue("password");

  expect(screen.getByRole("button", { name: /login/i })).toBeEnabled();
});

test("it should call 'onSubmit' function on Login click", () => {
  const onSubmit = jest.fn();
  render(<Login onSubmit={onSubmit} loginError="" />);

  const usernameInput = screen.getByPlaceholderText("Username");
  const passwordInput = screen.getByPlaceholderText("Password");

  fireEvent.change(usernameInput, { target: { value: "username" } });
  fireEvent.change(passwordInput, { target: { value: "password" } });
  screen.getByRole("button", { name: /login/i }).click();

  expect(onSubmit).toBeCalledWith("username", "password");
  expect(onSubmit).toHaveBeenCalledTimes(1);
});
