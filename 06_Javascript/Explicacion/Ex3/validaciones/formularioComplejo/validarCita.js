const validarNombre = () => {
  ocultarAviso("error-nombre");
  let nombre = document.getElementById("nombre");

  if (!nombre.value) {
    errores("Nombre obligatorio.", "error-nombre");
    return false;
  } else if (!patronNombreApellido.test(nombre.value)) {
    errores("Nombre inválido.", "error-nombre");
    return false;
  } else if (nombre.value.length > 20) {
    errores("El nombre no puede tener más de 20 caracteres.", "error-nombre");
    return false;
  }

  return true;
};

const validarApellido = () => {
  ocultarAviso("error-apellidos");
  let apellidos = document.getElementById("apellidos");

  if (!apellidos.value) {
    errores("Apellidos obligatorios.", "error-apellidos");
    return false;
  } else if (!patronNombreApellido.test(apellidos.value)) {
    errores("Apellido inválido.", "error-apellidos");
    return false;
  } else if (apellidos.value.length > 20) {
    errores(
      "Los apellidos no pueden tener más de 20 caracteres.",
      "error-apellidos"
    );
    return false;
  }

  return true;
};

const validarDni = () => {
  ocultarAviso("error-dni");
  let dni = document.getElementById("dni");

  if (!dni.value) {
    errores("DNI obligatorio.", "error-dni");
    return false;
  } else if (!patronDni.test(dni.value)) {
    errores("DNI inválido. Formato incorrecto.", "error-dni");
    return false;
  } else if (!validarLetraDni(dni.value)) {
    errores("DNI inválido. La letra no coincide.", "error-dni");
    return false;
  }

  return true;
};

const validarLetraDni = (dni) => {
  let letras = "TRWAGMYFPDXBNJZSQVHLCKE";
  let numero = dni.substring(0, 8);
  let letra = dni.substring(8).toUpperCase();
  let resto = numero % 23;

  return letra === letras.charAt(resto);
};

const validarEmail = () => {
  ocultarAviso("error-email");
  let email = document.getElementById("email");
  if (!email.value) {
    errores("Email obligatorio.", "error-email");
    return false;
  } else if (!patronEmail.test(email.value)) {
    errores("Formato de email NO válido.", "error-email");
    return false;
  }

  return true;
};

const validarMotivoCita = () => {
  ocultarAviso("error-motivo");
  let motivo = document.getElementById("motivo");

  if (!motivo.value) {
    errores("Motivo de la cita obligatorio.", "error-motivo");
    return false;
  } else if (!patronMotivo.test(motivo.value)) {
    errores(
      "Motivo de la cita inválido. Debe tener caracteres alfanuméricos, coma, punto, punto y coma, paréntesis abiertos y paréntesis cerrados.",
      "error-motivo"
    );
    return false;
  } else if (motivo.value.length > 255) {
    errores(
      "Debe tener un máximo de 255 caracteres alfanuméricos, coma, punto, punto y coma, paréntesis abiertos y paréntesis cerrados.",
      "error-motivo"
    );
    return false;
  }

  return true;
};

let ocultarElementos = [
  "error-nombre",
  "error-apellidos",
  "error-dni",
  "error-email",
  "error-motivo",
];

const validar = (event) => {
  // Ocultar todos los mensajes de error antes de validar
  let esValido =
    validarNombre() &&
    validarApellido() &&
    validarDni() &&
    validarEmail() &&
    validarMotivoCita();

  if (!esValido) {
    // Detiene el envío solo si hay errores
    event.preventDefault();
  } else {
    // Confirmación antes de enviar
    if (!confirm("¿Estás seguro de enviar los datos?")) {
      event.preventDefault();
    }
  }
};

document.getElementById("nombre").addEventListener("blur", validarNombre);
document.getElementById("apellidos").addEventListener("blur", validarApellido);
document.getElementById("dni").addEventListener("blur", validarDni);
document.getElementById("email").addEventListener("blur", validarEmail);
document.getElementById("motivo").addEventListener("blur", validarMotivoCita);
document.getElementById("formulario").addEventListener("submit", validar);
document
  .getElementById("limpiar")
  .addEventListener("click", () =>
    limpiarFormulario("formulario", ocultarElementos)
  );
