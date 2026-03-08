import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginatedList } from './paginated-list';

describe('PaginatedList', () => {
  let component: PaginatedList;
  let fixture: ComponentFixture<PaginatedList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginatedList],
    }).compileComponents();

    fixture = TestBed.createComponent(PaginatedList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
