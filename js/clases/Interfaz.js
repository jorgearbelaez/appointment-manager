import { cargarEdicion, eliminarCita } from "../funciones.js";
import { contenedorCitas } from "../selectores.js";

class Interfaz {
  mensajeAlerta(mensaje, tipo) {
    const mensajeAlerta = document.createElement("div");
    mensajeAlerta.classList.add("text-center", "alert", "d-block", "col-12");
    if (tipo === "error") {
      mensajeAlerta.classList.add("alert-danger");
    } else {
      mensajeAlerta.classList.add("alert-success");
    }

    mensajeAlerta.textContent = mensaje;

    document
      .querySelector("#contenido")
      .insertBefore(mensajeAlerta, document.querySelector(".agregar-cita"));

    setTimeout(() => {
      mensajeAlerta.remove();
    }, 4000);
  }
  mostrarCitas({ citas }) {
    //limpiar html
    this.limpiarHTML();

    citas.forEach((cita) => {
      const { mascota, propietario, telefono, fecha, hora, sintomas, id } =
        cita;

      //creamos el div
      const divCita = document.createElement("div");
      divCita.classList.add("cita", "p-3");
      divCita.dataset.id = id;

      //sripting de los elemntos de la cita
      const mascotaParrafo = document.createElement("h2");
      mascotaParrafo.classList.add(
        "card-title",
        "font-weight-bolder",
        "text-center"
      );
      mascotaParrafo.textContent = mascota;

      const propietarioParrafo = document.createElement("h2");
      propietarioParrafo.innerHTML = `
      <span class="font-weight-bolder">Propietario: </span> ${propietario}`;

      const telefonoParrafo = document.createElement("h2");
      telefonoParrafo.innerHTML = `
      <span class="font-weight-bolder">Telefono: </span> ${telefono}`;

      const fechaParrafo = document.createElement("h2");
      fechaParrafo.innerHTML = `
      <span class="font-weight-bolder">Fecha: </span> ${fecha}`;

      const horaParrafo = document.createElement("h2");
      horaParrafo.innerHTML = `
      <span class="font-weight-bolder">Hora: </span> ${hora}`;

      const sintomasParrafo = document.createElement("h2");
      sintomasParrafo.innerHTML = `
      <span class="font-weight-bolder">Sintomas: </span> ${sintomas}`;

      //boton para eliminar las citas

      const btnEliminar = document.createElement("button");
      btnEliminar.classList.add("btn", "btn-danger", "mr-2");
      btnEliminar.innerHTML =
        'Eliminar <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>';
      btnEliminar.onclick = () => eliminarCita(id);

      //editar cita
      const btnEditar = document.createElement("button");
      btnEditar.classList.add("btn", "btn-info", "mr-2");
      btnEditar.innerHTML =
        'Editar <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path></svg>';
      btnEditar.onclick = () => cargarEdicion(cita);

      divCita.appendChild(mascotaParrafo);
      divCita.appendChild(propietarioParrafo);
      divCita.appendChild(telefonoParrafo);
      divCita.appendChild(fechaParrafo);
      divCita.appendChild(horaParrafo);
      divCita.appendChild(sintomasParrafo);
      divCita.appendChild(btnEliminar);
      divCita.appendChild(btnEditar);

      //agregar al html
      contenedorCitas.appendChild(divCita);
    });
  }

  limpiarHTML() {
    while (contenedorCitas.firstChild)
      contenedorCitas.removeChild(contenedorCitas.firstChild);
  }
}
export default Interfaz;
