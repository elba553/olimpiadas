import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardBuscadorComponent } from './card-buscador.component';

describe('CardBuscadorComponent', () => {
  let component: CardBuscadorComponent;
  let fixture: ComponentFixture<CardBuscadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardBuscadorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardBuscadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
