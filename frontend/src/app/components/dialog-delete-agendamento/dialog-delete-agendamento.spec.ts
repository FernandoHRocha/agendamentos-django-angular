import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDeleteAgendamento } from './dialog-delete-agendamento';

describe('DialogDeleteAgendamento', () => {
  let component: DialogDeleteAgendamento;
  let fixture: ComponentFixture<DialogDeleteAgendamento>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogDeleteAgendamento],
    }).compileComponents();

    fixture = TestBed.createComponent(DialogDeleteAgendamento);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
