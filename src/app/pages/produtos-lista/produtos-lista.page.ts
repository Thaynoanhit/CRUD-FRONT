import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, AlertController } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { ProdutoService } from '../../services/produto.service';
import { Produto } from '../../models/produto';

@Component({
  selector: 'app-produtos-lista',
  templateUrl: './produtos-lista.page.html',
  styleUrls: ['./produtos-lista.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule]
})
export class ProdutosListaPage implements OnInit {
  produtos: Produto[] = [];

  constructor(
    public produtoService: ProdutoService,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.produtoService.getProdutos();
  }

  async confirmarDelete(id: number | undefined) {
    if (!id) return;

    const alert = await this.alertController.create({
      header: 'Confirmar exclusão',
      message: 'Você tem certeza que deseja excluir este produto?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Excluir',
          role: 'confirm',
          handler: async () => {
            await this.deleteProduto(id);
          }
        }
      ]
    });

    await alert.present();
  }

  private async deleteProduto(id: number) {
    const sucesso = await this.produtoService.deleteProduto(id);
    if (sucesso) {
      console.log('Produto deletado com sucesso');
      await this.produtoService.getProdutos();
    } else {
      console.error('Erro ao deletar produto');
    }
  }
}