import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarOrdemMovimentacao } from './criar-ordem-movimentacao';

describe('CriarOrdemMovimentacao', () => {
  let component: CriarOrdemMovimentacao;
  let fixture: ComponentFixture<CriarOrdemMovimentacao>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CriarOrdemMovimentacao]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CriarOrdemMovimentacao);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
