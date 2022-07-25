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
  const [fetchServerListError, setFetchServerListError] = useState<string>("");

  useEffect(() => {
    getServerList(token!)
      .then((response) => {
        if (!response.ok) {
          throw Error(
            "Oops! There was an issue with your request. Try again later."
          );
        }
        setFetchServerListError("");
        return response.json();
      })
      .then((data) => dispatch(setServerList(data)))
      .catch((error) => setFetchServerListError(error.message));
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
      {fetchServerListError ? (
        <p>{fetchServerListError}</p>
      ) : (
        <ServerTable serverList={serverList} searchData={searchData} />
      )}
    </div>
  );
};
