import { Component, inject } from '@angular/core';
import { AgendamentoService } from '../../core/services/agendamento';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';
import { LoadingBar } from '../loading-bar/loading-bar';
import { RouterLink } from "@angular/router";
import { AgendamentoListItem } from '../agendamento-list-item/agendamento-list-item';
import { MatDialog } from '@angular/material/dialog';
import { DialogDeleteAgendamento } from '../dialog-delete-agendamento/dialog-delete-agendamento';

@Component({
  selector: 'app-paginated-list',
  imports: [CommonModule, MatCardModule, MatButtonModule, MatExpansionModule, MatAccordion, MatIconModule, MatProgressBarModule, LoadingBar, RouterLink, AgendamentoListItem],
  templateUrl: './paginated-list.html',
  styleUrl: './paginated-list.css',
})
export class PaginatedList {
  protected service = inject(AgendamentoService);
  readonly dialog = inject(MatDialog);

  excluir(id: number) {
    const dialogRef = this.dialog.open(DialogDeleteAgendamento, {
      width: '350px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.confirmarExclusao(id);
      }
    });
  }

  private confirmarExclusao(id: number) {
    this.service.delete(id);
  }
}
