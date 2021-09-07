init();

async function init() {
  if (localStorage.getItem("user")) {
    let u = await getUser(localStorage.getItem("user"));
    console.log(u);
    crearSolicitudes(u);
  } else {
    alert("No has iniciado sesion");
    location.href = "/index.html";
  }
}

var cerrar = document.getElementById("cerrarsesion");
cerrar.addEventListener("click", () => {
  localStorage.removeItem("user");
  alert("Sesion Cerrada");
  location.href = "/index.html";
});

async function getUser(userId) {
  var res = await fetch(`http://fimartinez.tk/users/${userId}`, {
    method: "GET",
    credentials: "same-origin",
  });
  var resjson = res.json();
  return Promise.resolve(resjson);
}

async function getSolicitudes() {
  var res = await fetch(`http://fimartinez.tk/solicitudes`, {
    method: "GET",
    credentials: "same-origin",
  });
  var resjson = res.json();
  return Promise.resolve(resjson);
}

const crearSolicitudes = async (usuario) => {
  solicitudes = usuario.solicitudes;
  for (let i = 0; i < solicitudes.length; i++) {
    const sol = solicitudes[i];
    await crearSolicitud(sol, usuario);
  }
};

const crearSolicitud = async (sol, usuario) => {
  if (sol.intencion == 0) {
    inte = "COMPRA";
  } else {
    inte = "VENTA";
  }
  let parent = document.getElementsByClassName("solicitudes")[0];
  let soli = document.createElement("div");
  soli.classList.add("solicitud");
  let titulo = document.createElement("h2");
  let cant = document.createElement("h4");
  let usr = document.createElement("h3");
  let desc = document.createElement("p");
  let fecha = document.createElement("h3");
  let bot = document.createElement("div");
  var date = new Date(sol.createdAt);
  bot.classList.add("boton");
  titulo.innerHTML = `Solicitud de ${inte} de producto ${sol.productId + 1}`;
  usr.innerHTML = `Usuario: ${usuario.username} - ${usuario.email}`;
  cant.innerHTML = `Cantidad: ${sol.cantidad}`;
  desc.innerHTML = `Descripcion: ${sol.comentario}`;
  fecha.innerHTML = `Fecha: ${date}`;
  bot.innerHTML = "Aceptar";
  soli.appendChild(titulo);
  soli.appendChild(cant);
  soli.appendChild(usr);
  soli.appendChild(desc);
  soli.appendChild(fecha);
  soli.appendChild(bot);
  parent.appendChild(soli);
};
