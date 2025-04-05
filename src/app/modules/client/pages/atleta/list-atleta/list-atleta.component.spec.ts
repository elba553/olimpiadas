import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAtletaComponent } from './list-atleta.component';

describe('ListAtletaComponent', () => {
  let component: ListAtletaComponent;
  let fixture: ComponentFixture<ListAtletaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListAtletaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListAtletaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
