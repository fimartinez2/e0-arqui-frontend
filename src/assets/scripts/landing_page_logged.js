// const banner = document.getElementById('imagen_juego')

init();

async function init() {
  if (localStorage.getItem("user")) {
    console.log("ok");
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

// var fotoDesierto = document.getElementById("foto-desierto");
// var fotoNieve = document.getElementById("foto-nieve");
// // fotoBosque.addEventListener("click", () => abrirNuevoMapa());
// // fotoDesierto.addEventListener("click", ()=> abrirNuevoMapa());
// // fotoNieve.addEventListener("click", ()=> abrirNuevoMapa());

// let spanClosePartida = document.getElementById("close-partida");
// spanClosePartida.addEventListener("click", () => cerrarModalPartida());
// let botonSiPartida = document.getElementById("partida-definitivo");
// botonSiPartida.addEventListener("click", () => abrirMapa());
// let botonNoPartida = document.getElementById("no-partida");
// botonNoPartida.addEventListener("click", () => cerrarModalPartida());

// async function abrirMapa(){
//     var user =  await partidaPendiente()
//     if (user.partida_pendiente){
//         location.href = "vista_juego.html"
//     }
//     else {
//         location.href = "join_partida.html"
//     }
// }

// function abrirModalPartida(){
//     let modalPartida = document.getElementById("modal-nueva-partida");
//     modalPartida.style.display = "block";
// }

// function cerrarModalPartida(){
//     let modalPartida = document.getElementById("modal-nueva-partida");
//     modalPartida.style.display = "none";
// }

// async function abrirNuevoMapa(){
//     var user =  await partidaPendiente()
//     if (user.partida_pendiente){
//         location.href = "vista_juego.html"
//     }
//     else {
//         location.href = "partidas.html"
//     }
// }

// async function partidaPendiente(){
//     const url = `http://localhost:3000/equipos/`;
//     const myHeaders = new Headers();
//     myHeaders.append('Authorization', localStorage.getItem("token"));
//     var res = await fetch(url,
//         {method: "GET", credentials: "same-origin", headers: myHeaders});
//     var resjson = await res.json();
//     return Promise.resolve(resjson)
// }
