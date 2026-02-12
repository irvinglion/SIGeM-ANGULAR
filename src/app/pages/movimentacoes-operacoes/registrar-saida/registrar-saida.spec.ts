import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarSaida } from './registrar-saida';

describe('RegistrarSaida', () => {
  let component: RegistrarSaida;
  let fixture: ComponentFixture<RegistrarSaida>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrarSaida]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrarSaida);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
