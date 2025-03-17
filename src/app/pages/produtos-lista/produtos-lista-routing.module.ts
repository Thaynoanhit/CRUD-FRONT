import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProdutosListaPage } from './produtos-lista.page';

const routes: Routes = [
  {
    path: '',
    component: ProdutosListaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProdutosListaPageRoutingModule {}
