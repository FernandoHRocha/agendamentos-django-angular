import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendamentoListItem } from './agendamento-list-item';

describe('AgendamentoListItem', () => {
  let component: AgendamentoListItem;
  let fixture: ComponentFixture<AgendamentoListItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgendamentoListItem],
    }).compileComponents();

    fixture = TestBed.createComponent(AgendamentoListItem);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
