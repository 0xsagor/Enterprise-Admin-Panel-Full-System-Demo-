const ADMIN_PASS = "admin123";

let users = JSON.parse(localStorage.getItem("users")) || [];
let logs = JSON.parse(localStorage.getItem("logs")) || [];

function log(action) {
  logs.unshift({
    time: new Date().toLocaleString(),
    action
  });
  localStorage.setItem("logs", JSON.stringify(logs));
}

function login() {
  if (password.value !== ADMIN_PASS) {
    error.innerText = "Invalid password";
    return;
  }
  document.getElementById("login").style.display = "none";
  document.getElementById("app").style.display = "block";
  show("dashboard");
  log("Admin logged in");
  render();
}

function logout() {
  log("Admin logged out");
  location.reload();
}

function show(id) {
  document.querySelectorAll(".page").forEach(p => p.style.display = "none");
  document.getElementById(id).style.display = "block";
}

function addUser() {
  const name = username.value.trim();
  if (!name) return;

  users.push(name);
  localStorage.setItem("users", JSON.stringify(users));
  username.value = "";
  log(`User added: ${name}`);
  render();
}

function render() {
  userList.innerHTML = "";
  users.forEach(u => {
    const li = document.createElement("li");
    li.innerText = u;
    userList.appendChild(li);
  });

  userCount.innerText = users.length;

  logList.innerHTML = "";
  logs.forEach(l => {
    const li = document.createElement("li");
    li.innerText = `[${l.time}] ${l.action}`;
    logList.appendChild(li);
  });
}
