// variables selectores
const mascotaInput = document.querySelector("#mascota");
const propietarioInput = document.querySelector("#propietario");
const telefonoInput = document.querySelector("#telefono");
const fechaInput = document.querySelector("#fecha");
const horaInput = document.querySelector("#hora");
const sintomasInput = document.querySelector("#sintomas");

const formulario = document.querySelector("#nueva-cita");

const contenedorCitas = document.querySelector("#citas");

//clases
class Citas {
  constructor() {
    this.citas = [];
  }

  agregarCita(cita) {
    this.citas = [...this.citas, cita];

    console.log(this.citas);
  }
}
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

      divCita.appendChild(mascotaParrafo);
      divCita.appendChild(propietarioParrafo);
      divCita.appendChild(telefonoParrafo);
      divCita.appendChild(fechaParrafo);
      divCita.appendChild(horaParrafo);
      divCita.appendChild(sintomasParrafo);

      //agregar al html
      contenedorCitas.appendChild(divCita);
    });
  }
  limpiarHTML() {
    while (contenedorCitas.firstChild)
      contenedorCitas.removeChild(contenedorCitas.firstChild);
  }
}

//instanciamos

const interfaz = new Interfaz();
const administradorCitas = new Citas();

// eventos
EventListeners();
function EventListeners() {
  mascotaInput.addEventListener("input", datosCita);
  propietarioInput.addEventListener("input", datosCita);
  telefonoInput.addEventListener("input", datosCita);
  fechaInput.addEventListener("input", datosCita);
  horaInput.addEventListener("input", datosCita);
  sintomasInput.addEventListener("input", datosCita);

  formulario.addEventListener("submit", nuevaCita);
}
//objetos con la informacion de la cita
const citaObj = {
  mascota: "",
  propietario: "",
  telefono: "",
  fecha: "",
  hora: "",
  sintomas: "",
};

//funciones

//agrega los datos al objeto cita
function datosCita(e) {
  citaObj[e.target.name] = e.target.value;
}
//valida y agrega una nueva cita a la clase de citas

function nuevaCita(e) {
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

  //pasa validacion generamos id

  citaObj.id = Date.now();

  // creando nueva cita
  administradorCitas.agregarCita({ ...citaObj });

  //resetear formulario
  formulario.reset();

  //mostrar el html de las citas
  interfaz.mostrarCitas(administradorCitas);
}

function reiniciarObjeto() {
  citaObj.mascota = "";
  citaObj.propietario = "";
  citaObj.telefono = "";
  citaObj.fecha = "";
  citaObj.hora = "";
  citaObj.sintomas = "";
}
