import { sincronizarStorage, cargarStorage } from "../funciones.js";

//clases
class Citas {
  constructor() {
    this.citas = JSON.parse(localStorage.getItem("citasLocal")) || [];

    cargarStorage(this.citas);
  }

  agregarCita(cita) {
    this.citas = [...this.citas, cita];
    sincronizarStorage(this.citas);
  }
  eliminarCita(id) {
    this.citas = this.citas.filter((cita) => cita.id !== id);
    sincronizarStorage(this.citas);
  }
  editarCita(citaEditada) {
    this.citas = this.citas.map((cita) =>
      cita.id === citaEditada.id ? citaEditada : cita
    );
    sincronizarStorage(this.citas);
  }
}
export default Citas;
