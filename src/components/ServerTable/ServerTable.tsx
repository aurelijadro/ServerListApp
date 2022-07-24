import React from "react";

type ServerTableProps = {
  serverList: { name: string; distance: number }[];
  searchData?: string;
};
export const ServerTable = ({ serverList, searchData }: ServerTableProps) => {
  const tableData = () => {
    return serverList
      .filter(
        (server) =>
          server.name.toLowerCase().includes(searchData?.toLowerCase() || "") ||
          server.distance.toString().includes(searchData || "")
      )
      .map((server, index) => (
        <tr key={index}>
          <td>{server.name}</td>
          <td>{server.distance}</td>
        </tr>
      ));
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Server Name</th>
          <th>Distance</th>
        </tr>
      </thead>
      <tbody>{tableData()}</tbody>
    </table>
  );
};
