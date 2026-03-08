import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Agendamento } from '../models/Agendamento';
import { Observable } from 'rxjs/internal/Observable';
import { tap } from 'rxjs/internal/operators/tap';
import { ApiService } from './api-service';
import { ToastService } from './toast-service';

@Injectable({
  providedIn: 'root',
})
export class AgendamentoService {

  constructor(private apiService: ApiService, private toast: ToastService) {}

  #agendamentos = signal<Agendamento[]>([]);
  agendamentos = computed(() => this.#agendamentos());
  loading = signal<boolean>(false);

  fetchAll(): void {
    this.loading.set(true);
    this.apiService.get<Agendamento[]>('agendamentos/').subscribe({
      next: (data) => {
        this.#agendamentos.set(data);
        setTimeout(() => {
          this.loading.set(false)
        }, 1000);
      },
      error: (err) => {
        this.toast.showError('Erro ao buscar agendamentos. Por favor, tente novamente mais tarde.');
        console.error('Erro ao buscar agendamentos:', err);
        this.loading.set(false);
      },
    });
  }

  getById(id: number): Observable<Agendamento> {
    return this.apiService.get<Agendamento>(`agendamentos/${id}/`);
  }

  create(agendamento: Agendamento): Observable<Agendamento> {
    agendamento.data = new Date(agendamento.data).toLocaleDateString('en-CA');
    return this.apiService.post<Agendamento>('agendamentos/', agendamento).pipe(
      tap((newAgendamento) => {
        this.toast.showSuccess('Agendamento criado com sucesso!');
        this.#agendamentos.update(state => [...state, newAgendamento]);
      })
    );
  }

  update(id: number, agendamento: Agendamento): Observable<Agendamento> {
    agendamento.data = new Date(agendamento.data).toLocaleDateString('en-CA');
    return this.apiService.put<Agendamento>(`agendamentos/${id}/`, agendamento).pipe(
      tap((updatedAgendamento) => {
        this.toast.showSuccess('Agendamento atualizado com sucesso!');
        this.#agendamentos.update(state => 
          state.map(app => app.id === id ? updatedAgendamento : app)
        );
      })
    );
  }

  delete(id: number): void {
    this.loading.set(true);
    this.apiService.delete<void>(`agendamentos/${id}/`).subscribe({
      next: () => {
        this.toast.showSuccess('Agendamento excluído com sucesso!');
        this.#agendamentos.update(state => state.filter(app => app.id !== id));
        this.loading.set(false);
      },
      error: (err) => {
        this.toast.showError('Erro ao excluir agendamento. Por favor, tente novamente mais tarde.');
        console.error('Erro ao excluir agendamento:', err);
        this.loading.set(false);
      },
    });
  }
}
