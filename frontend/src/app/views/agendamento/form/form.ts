import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { provideLuxonDateAdapter } from '@angular/material-luxon-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from "@angular/material/card";
import { AgendamentoStatus, AgendamentoStatusLabels } from '../../../core/models/AgendamentoStatus';
import { futureDateTimeValidator, futureDateTimeErrorKey } from '../../../core/validators/futureDateTime';
import { AgendamentoService } from '../../../core/services/agendamento';
import { ToastService } from '../../../core/services/toast-service';
import { ActivatedRoute, Router } from '@angular/router';
import { Agendamento } from '../../../core/models/Agendamento';
import { DateTime } from 'luxon';

export const MY_FORMATS = {
  parse: {
    dateInput: 'DDD',
  },
  display: {
    dateInput: 'cccc dd/MM/yyyy',
    monthYearLabel: 'MMMM yyyy',
    dateA11yLabel: 'DDD',
    monthYearA11yLabel: 'MMMM yyyy',
  },
};

@Component({
  selector: 'app-form',
  providers: [
    provideLuxonDateAdapter(MY_FORMATS),
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './form.html',
  styleUrl: './form.css',
})
export class Form {
  today = new Date();
  agendamentoForm!: FormGroup;
  statusOptions = Object.values(AgendamentoStatus).map(status => ({ value: status, label: AgendamentoStatusLabels[status] }));
  futureDateTimeErrorKey = futureDateTimeErrorKey;
  editMode: boolean = false;

  constructor(
    private fb: FormBuilder,
    private agendamentoService: AgendamentoService,
    private toast: ToastService,
    private route: ActivatedRoute,
    public router: Router
  ) {
    this.initializeForm();

    this.editMode = false;
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editMode = true;
      this.loadAgendamento(Number(id));
    }
  }

  initializeForm() {
    this.agendamentoForm = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(3)]],
      data: [null, Validators.required],
      horario: ['', [Validators.required, futureDateTimeValidator]],
      status: ['', Validators.required],
      descricao: ['']
    });

    this.agendamentoForm.get('data')?.valueChanges.subscribe(() => {
      this.agendamentoForm.get('horario')?.updateValueAndValidity();
    });
  }

  loadAgendamento(id: number) {
    this.agendamentoService.getById(id).subscribe({
      next: (agendamento: Agendamento) => {
        this.agendamentoForm.patchValue({
          titulo: agendamento.titulo,
          data: agendamento.data ? DateTime.fromISO(agendamento.data) : null,
          horario: agendamento.horario,
          status: agendamento.status,
          descricao: agendamento.descricao
        });
      },
      error: (err) => {
        if (err.status === 404) {
          this.toast.showError('Agendamento não encontrado. Verifique o ID e tente novamente.');
          this.router.navigate(['/agendamento']);
        }
      }
    });
  }

  create() {
    this.agendamentoForm.markAllAsTouched();
    for (const control in this.agendamentoForm.controls) {
      this.agendamentoForm.get(control)?.updateValueAndValidity();
    }
    if (this.agendamentoForm.valid) {
      this.agendamentoService.create(this.agendamentoForm.value).subscribe({
        next: (response) => {
          this.toast.showSuccess('Agendamento criado com sucesso!');
          this.agendamentoForm.reset();
        },
        error: (err) => {
          if (err.error) {
            this.handleError(err);
          } else {
            this.toast.showError('Erro ao criar agendamento. Por favor, tente novamente.');
          }
        }
      });
    }
  }

  edit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.agendamentoService.update(id, this.agendamentoForm.value).subscribe({
      next: (response) => {
        this.toast.showSuccess('Agendamento atualizado com sucesso!');
        this.router.navigate(['/agendamento']);
      },
      error: (err) => {
        if (err.error) {
          this.handleError(err);
        } else {
          this.toast.showError('Erro ao atualizar agendamento. Por favor, tente novamente.');
        }
      }
    });
  }

  submitForm() {
    if (this.editMode) {
      this.edit();
    } else {
      this.create();
    }
  }

  handleError(error: any) {
    let fieldsWithErrors = Object.keys(error.error).join(', ');
    this.toast.showError(`Erro ao atualizar agendamento. Verifique os campos: ${fieldsWithErrors}`);
    Object.keys(error.error).forEach((field) => {
      const formControl = this.agendamentoForm.get(field);
      if (formControl) {
        formControl.setErrors({ serverError: error.error[field] });
      }
    });
  }
}
