import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarSaidaComponent } from './registrar-saida';

describe('RegistrarSaida', () => {
  let component: RegistrarSaidaComponent;
  let fixture: ComponentFixture<RegistrarSaidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrarSaidaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrarSaidaComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
