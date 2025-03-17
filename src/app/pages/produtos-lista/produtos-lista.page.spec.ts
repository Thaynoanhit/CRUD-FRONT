import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProdutosListaPage } from './produtos-lista.page';

describe('ProdutosListaPage', () => {
  let component: ProdutosListaPage;
  let fixture: ComponentFixture<ProdutosListaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdutosListaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
