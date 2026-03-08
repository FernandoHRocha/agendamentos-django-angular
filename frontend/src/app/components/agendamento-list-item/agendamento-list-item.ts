import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { Agendamento } from '../../core/models/Agendamento';

@Component({
  selector: 'app-agendamento-list-item',
  imports: [CommonModule, MatExpansionModule, MatIconModule, MatButtonModule, RouterLink],
  templateUrl: './agendamento-list-item.html',
  styleUrl: './agendamento-list-item.scss',
})
export class AgendamentoListItem {
  agendamento = input.required<Agendamento>();
  
  onExcluir = output<number | string>();

  excluir(id: number | string) {
    this.onExcluir.emit(id);
  }
}
