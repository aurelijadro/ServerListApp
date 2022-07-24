export const getAuthorizationToken = (username: string, password: string) => {
  return fetch("https://playground.tesonet.lt/v1/tokens", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
};

export const getServerList = (token: string) => {
  return fetch("https://playground.tesonet.lt/v1/servers", {
    method: "GET",
    headers: { "Content-Type": "application/json", Authorization: token },
  });
};
