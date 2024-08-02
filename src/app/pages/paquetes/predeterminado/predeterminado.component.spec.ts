import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PredeterminadoComponent } from './predeterminado.component';

describe('PredeterminadoComponent', () => {
  let component: PredeterminadoComponent;
  let fixture: ComponentFixture<PredeterminadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PredeterminadoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PredeterminadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
