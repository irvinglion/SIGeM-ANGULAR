import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarOrdemMovimentacaoComponent } from './criar-ordem-movimentacao';

describe('CriarOrdemMovimentacao', () => {
  let component: CriarOrdemMovimentacaoComponent;
  let fixture: ComponentFixture<CriarOrdemMovimentacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CriarOrdemMovimentacaoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CriarOrdemMovimentacaoComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
