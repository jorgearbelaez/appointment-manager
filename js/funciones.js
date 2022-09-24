import Citas from "./clases/Citas.js";
import Interfaz from "./clases/Interfaz.js";

import {
  mascotaInput,
  propietarioInput,
  telefonoInput,
  fechaInput,
  horaInput,
  sintomasInput,
  formulario,
} from "./selectores.js";

//instanciamos

const interfaz = new Interfaz();
const administradorCitas = new Citas();

let editando;
//objetos con la informacion de la cita
const citaObj = {
  mascota: "",
  propietario: "",
  telefono: "",
  fecha: "",
  hora: "",
  sintomas: "",
};

//agrega los datos al objeto cita
export function datosCita(e) {
  citaObj[e.target.name] = e.target.value;
}
//valida y agrega una nueva cita a la clase de citas

export function nuevaCita(e) {
  e.preventDefault();

  // extraer informacion delobjeto de cita

  const { mascota, propietario, telefono, fecha, hora, sintomas } = citaObj;

  //validar
  if (
    mascota === "" ||
    propietario === "" ||
    telefono === "" ||
    fecha === "" ||
    hora === "" ||
    sintomas === ""
  ) {
    interfaz.mensajeAlerta("Todos los campos son obligatorios", "error");
    return;
  }

  if (editando) {
    //reingresando la cita con los cambios
    administradorCitas.editarCita({ ...citaObj });

    // mensaje de exito
    interfaz.mensajeAlerta("Cambios guardados");
    // cmabiar texto boton
    formulario.querySelector('button[type ="submit"]').textContent =
      "Crear Cita";
    // cerrar modo edicion
    editando = false;
  } else {
    //pasa validacion generamos id

    citaObj.id = Date.now();

    // creando nueva cita
    administradorCitas.agregarCita({ ...citaObj });

    // mensaje de exito
    interfaz.mensajeAlerta("Se agrego correctamente");
  }

  //resetear formulario
  formulario.reset();

  //reiniciarObjeto
  reiniciarObjeto();

  //mostrar el html de las citas
  interfaz.mostrarCitas(administradorCitas);
}

export function reiniciarObjeto() {
  citaObj.mascota = "";
  citaObj.propietario = "";
  citaObj.telefono = "";
  citaObj.fecha = "";
  citaObj.hora = "";
  citaObj.sintomas = "";
}
export function eliminarCita(id) {
  //mandar a llamar el metodo que me eliminara la cita
  administradorCitas.eliminarCita(id);

  // mostrar mensaje de exito al borrar la cita
  interfaz.mensajeAlerta("Se ha borrado exitosamente la cita");

  //actualizar citas en el html
  interfaz.mostrarCitas(administradorCitas);
}

// cargar los datos para la edicion
export function cargarEdicion(cita) {
  const { mascota, propietario, telefono, fecha, hora, sintomas, id } = cita;

  // llenar los imputs
  mascotaInput.value = mascota;
  propietarioInput.value = propietario;
  telefonoInput.value = telefono;
  fechaInput.value = fecha;
  horaInput.value = hora;
  sintomasInput.value = sintomas;

  // llenar el objeto global
  citaObj.mascota = mascota;
  citaObj.propietario = propietario;
  citaObj.telefono = telefono;
  citaObj.fecha = fecha;
  citaObj.hora = hora;
  citaObj.sintomas = sintomas;
  citaObj.id = id;

  //cambiar texto button
  formulario.querySelector('button[type ="submit"]').textContent =
    "Guardar Cambios";

  editando = true;
}

export function sincronizarStorage(citas) {
  localStorage.setItem("citasLocal", JSON.stringify(citas));
}
export function cargarStorage(citas) {
  interfaz.mostrarCitas({ citas });
}
