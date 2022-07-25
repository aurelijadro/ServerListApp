import React from "react";
import { resetToken } from "../../app/authorizationSlice";
import { useAppDispatch } from "../../app/hooks";
import "./NavBar.scss";

type NavBarProps = {
  iSLoggedIn: boolean;
};

export const NavBar = ({ iSLoggedIn }: NavBarProps) => {
  const dispatch = useAppDispatch();

  const logOut = () => {
    sessionStorage.removeItem("token");
    dispatch(resetToken());
  };

  return (
    <div className="navbar-container">
      <h4>Find Your Server</h4>
      {iSLoggedIn && <button onClick={logOut}>Log Out</button>}
    </div>
  );
};
