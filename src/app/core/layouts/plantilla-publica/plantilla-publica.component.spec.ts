/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantillaPublicaComponent } from './plantilla-publica.component';

describe('PlantillaPublicaComponent', () => {
  let component: PlantillaPublicaComponent;
  let fixture: ComponentFixture<PlantillaPublicaComponent>;

  beforeEach((() => {
    TestBed.configureTestingModule({
      declarations: [ PlantillaPublicaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantillaPublicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
