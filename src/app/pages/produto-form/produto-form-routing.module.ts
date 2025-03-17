import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProdutoFormPage } from './produto-form.page';

const routes: Routes = [
  {
    path: '',
    component: ProdutoFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProdutoFormPageRoutingModule {}
