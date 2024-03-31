document.getElementById("connect-button").addEventListener("click", () => {
  let username = document.getElementById("input-username").value;
  let password = document.getElementById("input-password").value;
  console.log({ username: username, password: password });
  request("POST", { username: username, password: password }, "/connect");
});
