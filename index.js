const urlLogin = "http://fimartinez.tk/login";
localStorage.removeItem("user");
async function iniciarSesion() {
  //   console.log("iniciando sesion");
  let password = document.getElementById("clave").value;
  let correo = document.getElementById("email").value;

  var obj = {
    login: correo,
    password: password,
  };

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  var res = await fetch(urlLogin, {
    method: "POST",
    credentials: "same-origin",
    headers: myHeaders,
    body: JSON.stringify(obj),
  });
  var resjson = res.json();
  return Promise.resolve(resjson);
}

$("#inicio-sesion-button").click(() => {
  iniciarSesion().then(function (res) {
    console.log(res);
    if (res.status) {
      localStorage.setItem("user", res.userId);
      location.href = "./src/views/landing_page_logged.html";
    } else {
      alert(res.msg);
    }
  });
});
