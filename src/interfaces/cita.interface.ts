export interface Cita {
    id : number;
    pacienteId: number;
    medicoId: number;
    fechaHora: string;
    estado: "pendiente" | "atendido";
}