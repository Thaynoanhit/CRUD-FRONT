import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'produtos',
    pathMatch: 'full'
  },
  {
    path: 'produtos',
    loadComponent: () => import('./pages/produtos-lista/produtos-lista.page').then(m => m.ProdutosListaPage)
  },
  {
    path: 'produto/:id',
    loadComponent: () => import('./pages/produto-detalhes/produto-detalhes.page').then(m => m.ProdutoDetalhesPage)
  },
  {
    path: 'produto-form',
    loadComponent: () => import('./pages/produto-form/produto-form.page').then(m => m.ProdutoFormPage)
  },
  {
    path: 'produto-form/:id',
    loadComponent: () => import('./pages/produto-form/produto-form.page').then(m => m.ProdutoFormPage)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }