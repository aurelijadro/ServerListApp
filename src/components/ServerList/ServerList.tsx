import React, { useEffect, useState } from "react";
import { getServerList } from "../../app/api";
import { selectToken } from "../../app/authorizationSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectServerList, setServerList } from "../../app/serverListSlice";
import { ServerTable } from "../ServerTable/ServerTable";

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
    <>
      <input
        type="text"
        onChange={(event) => setSearchData(event?.target.value)}
      />
      <ServerTable serverList={serverList} searchData={searchData} />
    </>
  );
};
