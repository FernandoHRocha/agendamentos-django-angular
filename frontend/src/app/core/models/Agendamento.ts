import { AgendamentoStatus } from "./AgendamentoStatus";

export interface Agendamento {
  id?: number;
  titulo: string;
  descricao?: string;
  data: string;
  horario: string;
  status: AgendamentoStatus;
  created_at?: string;
}