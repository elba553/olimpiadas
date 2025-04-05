import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardDocumentComponent } from './card-action.component';

describe('CardDocumentComponent', () => {
  let component: CardDocumentComponent;
  let fixture: ComponentFixture<CardDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardDocumentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
