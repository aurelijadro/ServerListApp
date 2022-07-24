import React, { useEffect, useState } from "react";
import { getServerList } from "../../app/api";
import { selectToken } from "../../app/authorizationSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectServerList, setServerList } from "../../app/serverListSlice";
import { ServerTable } from "../ServerTable/ServerTable";

import "./ServerList.scss";

export const ServerList = () => {
  const token = useAppSelector(selectToken);
  const serverList = useAppSelector(selectServerList);
  const dispatch = useAppDispatch();

  const [searchData, setSearchData] = useState("");

  useEffect(() => {
    getServerList(token!)
      .then((response) => response.json())
      .then((data) => dispatch(setServerList(data)));
  }, [dispatch, token]);

  return (
    <div className="server-list-container">
      <label>
        Search for the server:
        <input
          className="search-input"
          autoFocus
          type="text"
          onChange={(event) => setSearchData(event?.target.value)}
        />
      </label>
      <ServerTable serverList={serverList} searchData={searchData} />
    </div>
  );
};
