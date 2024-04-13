document.getElementById("submit-login").addEventListener("click", login);

async function login() {
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;
  let response = await request("POST", { username: username, password: password }, "/user/login");

  if (response.error) {
    document.getElementById("login-error-display").innerHTML = response.error;
  } else {
    window.location.href = "/user/profile";
  }
}
