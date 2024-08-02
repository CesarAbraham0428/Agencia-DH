import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaquetesPersonalizadosComponent } from './paquetes-personalizados.component';

describe('PaquetesPersonalizadosComponent', () => {
  let component: PaquetesPersonalizadosComponent;
  let fixture: ComponentFixture<PaquetesPersonalizadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaquetesPersonalizadosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaquetesPersonalizadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
