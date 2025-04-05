import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAtletaComponent } from './form-atleta.component';

describe('FormAtletaComponent', () => {
  let component: FormAtletaComponent;
  let fixture: ComponentFixture<FormAtletaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormAtletaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormAtletaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
