let usrProds = [];
let listaProds = [];
let productoSeleccionado = {
  nombre: "Seleccione un producto",
};

init();

const updateText = (val) => {
  document.getElementById("cantidad").innerHTML = val;
};

$("#botonprod").click(async function (e) {
  e.preventDefault();
  var intencion = document.getElementsByClassName("sel-inten");
  if (intencion.length == 0) {
    alert("Debe seleccionar compra o venta");
  } else {
    if (intencion[0].innerHTML == "Compra") {
      await crearListaProd(listaProds);
    } else {
      await crearListaProd(usrProds);
    }
    document.getElementById("productoss").classList.remove("modal--hidden");
  }
});

$("#equisMap").click(function (e) {
  e.preventDefault();
  document.getElementById("productoss").classList.add("modal--hidden");
});

$(".inten").click(function (e) {
  e.preventDefault();
  $(this).toggleClass("sel-inten");
  $(".inten").not(this).removeClass("sel-inten");
});

$(".prod").click(function (e) {
  e.preventDefault();
  $(this).toggleClass("selected");
  $(".prod").not(this).removeClass("selected");
});

$("#elegirprod").click(function (e) {
  e.preventDefault();
  let prodId = document.getElementsByClassName("selected");
  if (prodId.length == 0) {
    alert("Debe seleccionar un producto.");
  } else {
    // localStorage.setItem("prodId", parseInt(prodId[0].id));
    // console.log(prodId[0].children);
    // let nombre = prodId[0].children[0].innerHTML;
    productoSeleccionado = listaProds[parseInt(prodId[0].id) - 1];
    document.getElementById("nombre-selec").innerHTML =
      productoSeleccionado.nombre;
    var slid = document.getElementById("slider");
    slid.setAttribute("max", `${productoSeleccionado.cantidadDisponible}`);
    slid.setAttribute("value", `0.5`);
    slid.disabled = false;
    $(".modal").toggleClass("modal--hidden");
  }
});

async function init() {
  if (localStorage.getItem("user")) {
    let usr = await getUserProducts(localStorage.getItem("user"));
    usrProds = usr.productos;
    listaProds = await getProductos();
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

async function getUserProducts(userId) {
  var res = await fetch(`http://fimartinez.tk/users/${userId}`, {
    method: "GET",
    credentials: "same-origin",
  });
  var resjson = res.json();
  return Promise.resolve(resjson);
}

async function getProductos() {
  var res = await fetch(`http://fimartinez.tk/productos`, {
    method: "GET",
    credentials: "same-origin",
  });
  var resjson = res.json();
  return Promise.resolve(resjson);
}

const crearListaProd = async (prods) => {
  prods.sort((a, b) => {
    return a.id - b.id;
  });
  document.getElementById("listaprod").innerHTML = "";
  for (let i = 0; i < prods.length; i++) {
    const prod = prods[i];
    await crearProd(prod);
  }
  $(".prod").click(function (e) {
    e.preventDefault();
    $(this).toggleClass("selected");
    $(".prod").not(this).removeClass("selected");
  });
};

$("#enviar").click(async function (e) {
  e.preventDefault();
  let cant = document.getElementById("slider").value;
  console.log(cant);
  if (cant > 0.5) {
    var inten = document.getElementsByClassName("sel-inten")[0];
    if (inten.innerHTML == "Compra") {
      var intencion = 0;
    } else {
      var intencion = 1;
    }
    let desc = document.getElementById("cajatexto").value;

    let obj = {
      cantidad: cant,
      comentario: desc,
      intencion: intencion,
      userId: localStorage.getItem("user"),
      productId: productoSeleccionado.id,
    };
    await postSolicitud(obj);
    alert("Solicitud enviada.");
    location.href = "solicitudes.html";
  } else {
    alert("Debe llenar todos los campos.");
  }
});

const crearProd = async (prod) => {
  let parent = document.getElementById("listaprod");
  let soli = document.createElement("div");
  soli.classList.add("prod");
  soli.id = prod.id;
  let nombre = document.createElement("h3");
  let desc = document.createElement("p");
  let cant = document.createElement("h4");
  nombre.innerHTML = prod.nombre;
  cant.innerHTML = `Cantidad disponible: ${prod.cantidadDisponible}`;
  desc.innerHTML = prod.descripcion;
  soli.appendChild(nombre);
  soli.appendChild(desc);
  soli.appendChild(cant);
  parent.appendChild(soli);
};

const postSolicitud = async (obj) => {
  const url = "http://fimartinez.tk/solicitudes";
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var res = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: myHeaders,
    body: JSON.stringify(obj),
  });
  var resjson = res.json();
  return Promise.resolve(resjson);
};
