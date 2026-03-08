export enum AgendamentoStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  CANCELLED = 'cancelled'
}

export const AgendamentoStatusLabels: { [key in AgendamentoStatus]: string } = {
  [AgendamentoStatus.PENDING]: 'Pendente',
  [AgendamentoStatus.CONFIRMED]: 'Confirmado',
  [AgendamentoStatus.CANCELLED]: 'Cancelado'
};