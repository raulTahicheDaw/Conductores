export interface DiaInterface {
  id?: string;
  fecha: string;
  horaComienzo: string;
  horaFinal: string;
  conductor: string;
  estado: boolean;
  transfers_1: number;
  transfers_2: number;
  transfers_3: number;
  excursiones: number;
  otrosServicios: number;
  turnoPartido: boolean;
  horasPartido?: number;
  traslados: number;
}
