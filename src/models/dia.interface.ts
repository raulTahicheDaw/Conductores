export interface DiaInterface {
  id?: string;
  fecha: string;
  hora_comienzo: string;
  hora_final: string;
  conductor: string;
  estado: boolean;
  transfers_1: number;
  transfers_2: number;
  transfers_3: number;
  excursiones: number;
  otros_servicios:number;
  turno_partido: boolean;
  horas_partido?: number;
  traslados: number;
}
