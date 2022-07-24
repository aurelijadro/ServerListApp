import React, { useState } from "react";
import classNames from "classnames";
import "./ServerTable.scss";

type Server = {
  name: string;
  distance: number;
};

enum Sort {
  None,
  AZ,
  ZA,
  Closest,
  FurthestAway,
}

type ServerTableProps = {
  serverList: Server[];
  searchData?: string;
};
export const ServerTable = ({ serverList, searchData }: ServerTableProps) => {
  const [sortType, setSortType] = useState(Sort.None);

  const onSortByServerNameClick = () => {
    if (sortType !== Sort.AZ) {
      setSortType(Sort.AZ);
    } else {
      setSortType(Sort.ZA);
    }
  };

  const onSortByServerDistanceClick = () => {
    if (sortType !== Sort.Closest) {
      setSortType(Sort.Closest);
    } else {
      setSortType(Sort.FurthestAway);
    }
  };

  const filteredServerList = serverList.filter(
    (server) =>
      server.name.toLowerCase().includes(searchData?.toLowerCase() || "") ||
      server.distance.toString().includes(searchData || "")
  );

  const sortedServerList = (
    serverList: Server[],
    sortType: Sort = Sort.None
  ): Server[] => {
    switch (sortType) {
      case Sort.None:
        return serverList;
      case Sort.AZ:
        return serverList.sort((a, b) => a.name.localeCompare(b.name));
      case Sort.ZA:
        return serverList.sort((a, b) => b.name.localeCompare(a.name));
      case Sort.Closest:
        return serverList.sort((a, b) => a.distance - b.distance);
      case Sort.FurthestAway:
        return serverList.sort((a, b) => b.distance - a.distance);
      default:
        return serverList;
    }
  };

  const tableData = (dataList: Server[]) => {
    return dataList.map((server, index) => (
      <tr
        key={index}
        className={classNames(
          "server-table-row",
          index % 2 === 0 ? "server-table-row-even" : "server-table-row-odd"
        )}
      >
        <td>{server.name}</td>
        <td>{server.distance}</td>
      </tr>
    ));
  };

  return (
    <div className="server-table-container">
      {filteredServerList.length ? (
        <table cellSpacing="0">
          <thead>
            <tr>
              <th>
                SERVER NAME:{" "}
                <button
                  className="server-table-sort"
                  onClick={onSortByServerNameClick}
                />
              </th>
              <th>
                DISTANCE:{" "}
                <button
                  className="server-table-sort"
                  onClick={onSortByServerDistanceClick}
                />
              </th>
            </tr>
          </thead>
          <tbody>
            {tableData(sortedServerList(filteredServerList, sortType))}
          </tbody>
        </table>
      ) : (
        <p className="server-table-no-data">
          No servers found at this moment. Try updating your search parameters.
        </p>
      )}
    </div>
  );
};
