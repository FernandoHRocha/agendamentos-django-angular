import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginatedList } from '../../../components/paginated-list/paginated-list';
import { AgendamentoService } from '../../../core/services/agendamento';

@Component({
  selector: 'app-list',
  imports: [CommonModule, PaginatedList],
  templateUrl: './list.html',
  styleUrl: './list.css',
})
export class List {
  protected service = inject(AgendamentoService);

  ngOnInit() {
    this.service.fetchAll();
  }
}
