import { generarId } from "./funciones";
import type { Cita } from "./types.ts";
export let editando ={
    value: false
}

// Objeto de Cita
export const citaObj:Cita = {
    id: generarId(),
    paciente: '',
    propietario: '',
    email: '',
    fecha: '',
    sintomas: ''
}

