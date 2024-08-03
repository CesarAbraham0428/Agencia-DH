import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Parte5Component } from './parte5.component';

describe('Parte5Component', () => {
  let component: Parte5Component;
  let fixture: ComponentFixture<Parte5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Parte5Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Parte5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
