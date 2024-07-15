import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioProfileComponent } from './usuario-profile.component';

describe('UsuarioProfileComponent', () => {
  let component: UsuarioProfileComponent;
  let fixture: ComponentFixture<UsuarioProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsuarioProfileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UsuarioProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
