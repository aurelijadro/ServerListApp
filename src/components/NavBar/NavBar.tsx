import React from "react";
import { resetToken } from "../../app/authorizationSlice";
import { useAppDispatch } from "../../app/hooks";
import "./NavBar.scss";

type NavBarProps = {
  iSLoggedIn: boolean;
};

export const NavBar = ({ iSLoggedIn }: NavBarProps) => {
  const dispatch = useAppDispatch();

  return (
    <div className="navbar-container">
      <h4>Find Your Server</h4>
      {iSLoggedIn && (
        <button onClick={() => dispatch(resetToken())}>Log Out</button>
      )}
    </div>
  );
};
