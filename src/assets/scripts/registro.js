botonRegistro = document.getElementById("submit-boton");
botonRegistro.addEventListener("click", () => registrarUsuario());

// async function getUsuariosTodos() {
//   const urlGetUsuario = "http://fimartinez.tk/";
//   var res = await fetch(urlGetUsuario, {
//     method: "GET",
//     credentials: "same-origin",
//   });
//   var resjson = res.json();
//   return Promise.resolve(resjson);
// }

async function CrearUsuario(nombre, mail, pw) {
  console.log("holasaaa");
  const url = "http://fimartinez.tk/users";
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const obj = {
    username: nombre,
    email: mail,
    password: pw,
  };
  var res = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: myHeaders,
    body: JSON.stringify(obj),
  });
  var resjson = res.json();
  return Promise.resolve(resjson);
}

async function registrarUsuario() {
  let username = document.getElementById("nombre-usuario").value;
  let password = document.getElementById("password").value;
  let password2 = document.getElementById("password2").value;
  let correo = document.getElementById("email").value;

  //codigo de validaciones es adaptación a https://stackoverflow.com/q/55812667

  //validamos el email
  let emailRGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (emailRGEX.test(correo) == false) {
    alert("El correo ingresado no es válido");
    return false;
  }

  //clave con al menos 1 minuscula
  var lowerCaseLetters = /[a-z]/g;
  if (password.match(lowerCaseLetters) == null) {
    alert("La constraseña debe contener al menos una minúscula");
    return false;
  }

  //clave con al menos 1 mayuscula
  var upperCaseLetters = /[A-Z]/g;
  if (password.match(upperCaseLetters) == null) {
    alert("La contraseña debe tener al menos una mayúscula");
    return false;
  }

  //clave con al menos un numero
  var numbers = /[0-9]/g;
  if (password.match(numbers) == null) {
    alert("La contraseña debe tener al menos un número");
    return false;
  }

  //largo de minimo 4 caracteres
  if (password.length < 4) {
    alert("La contraseña debe tener un mínimo de 4 caracteres");
    return false;
  }

  //verificamos que el mail no esté ya registrado
  // const todosUsuarios = await getUsuariosTodos();
  // for (u in todosUsuarios) {
  //   if (todosUsuarios[u].mail == correo) {
  //     alert("Mail ingresado ya se encuentra registrado");
  //     return false;
  //   }
  // }

  //verificamos que las contraseñas coincidan
  if (password === password2) {
    console.log("hola");
    //creamos el nuevo usuario y seteamos el token
    const res = await CrearUsuario(username, correo, password);
    console.log(res);
    if (res.errors) {
      alert(res.errors[0].message);
    } else {
      if (res.id) {
        localStorage.setItem("user", res.id);
        alert("Usuario creado correctamente!");
        location.href = "../views/landing_page_logged.html";
      }
    }
  } else {
    alert("Las contraseñas deben ser iguales.");
  }
}
