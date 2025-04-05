import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardImageInfoComponent } from './card-image-info.component';

describe('CardImageInfoComponent', () => {
  let component: CardImageInfoComponent;
  let fixture: ComponentFixture<CardImageInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardImageInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardImageInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
