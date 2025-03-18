import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Produto } from '../models/produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  private _produtos: Produto[] = [];
  private apiUrl = 'http://192.168.18.41:8080/api';

  constructor(
    private http: HttpClient
  ) {}

  async getProdutos() {
    try {
      const produtos = await this.http.get<Produto[]>(`${this.apiUrl}/produto`).toPromise();
      if (produtos) {
        this._produtos = produtos;
      }
    } 
    catch(error) {
      console.error(error);
      this._produtos = [];
    }
  }

  async getProduto(id: number): Promise<Produto | undefined> {
    try {
      const produto = await this.http.get<Produto>(`${this.apiUrl}/produto/${id}`).toPromise();
      if (produto) {
        const index = this._produtos.findIndex(p => p.id === id);
        if (index !== -1) {
          this._produtos[index] = produto;
        }
        return produto;
      }
      return undefined;
    }
    catch(error) {
      console.error(error);
      return undefined;
    }
  }

  async addProduto(produto: Produto, imagem?: File): Promise<Produto | undefined> {
    try {
      if (imagem) {
        const formData = new FormData();
        formData.append('nome', produto.nome);
        formData.append('descricao', produto.descricao || '');
        formData.append('preco', produto.preco.toString());
        formData.append('quantidade', produto.quantidade.toString());
        if (produto.categoria) {
          formData.append('categoria', produto.categoria);
        }
        formData.append('imagem', imagem);

        const novoProduto = await this.http.post<Produto>(`${this.apiUrl}/produto`, formData).toPromise();
        if (novoProduto) {
          this._produtos.push(novoProduto);
          return novoProduto;
        }
      } else {
        const novoProduto = await this.http.post<Produto>(`${this.apiUrl}/produto`, produto).toPromise();
        if (novoProduto) {
          this._produtos.push(novoProduto);
          return novoProduto;
        }
      }
      return undefined;
    }
    catch(error) {
      console.error('Erro ao adicionar produto:', error);
      return undefined;
    }
  }

  async updateProduto(produto: Produto, imagem?: File): Promise<Produto | undefined> {
    try {
      if (!produto.id) {
        console.error('ID do produto não definido');
        return undefined;
      }

      const produtoAtual = await this.getProduto(produto.id);
      if (!produtoAtual) {
        console.error('Produto não encontrado para atualização');
        return undefined;
      }

      let dadosAtualizados = false;
      let imagemAtualizada = false;
      
      dadosAtualizados = 
        produto.nome !== produtoAtual.nome ||
        produto.descricao !== produtoAtual.descricao ||
        produto.preco !== produtoAtual.preco ||
        produto.quantidade !== produtoAtual.quantidade ||
        produto.categoria !== produtoAtual.categoria;
      
     
      imagemAtualizada = imagem !== undefined;
      
      let produtoAtualizado: Produto | undefined;
      
      
      if (dadosAtualizados) {
        const response = await this.http.put<any>(`${this.apiUrl}/produto/${produto.id}`, produto).toPromise();
        
        if (response && response.status) {
          produtoAtualizado = response.produto;
          if (produtoAtualizado) { 
            const index = this._produtos.findIndex(p => p.id === produto.id);
            if (index !== -1) {
              this._produtos[index] = produtoAtualizado;
            }
          }
        } else {
          console.error('Erro na resposta da API ao atualizar dados');
          return undefined;
        }
      }
      
      
      if (imagemAtualizada && imagem) {
        const formData = new FormData();
        formData.append('imagem', imagem);
        
        const response = await this.http.post<any>(`${this.apiUrl}/produto/atualizar_imagem/${produto.id}`, formData).toPromise();
        
        if (response && response.status) {
          produtoAtualizado = response.produto;
          if (produtoAtualizado) { 
            const index = this._produtos.findIndex(p => p.id === produto.id);
            if (index !== -1) {
              this._produtos[index] = produtoAtualizado;
            }
          }
        } else {
          console.error('Erro na resposta da API ao atualizar imagem');
          return undefined;
        }
      }
      
     
      if (!dadosAtualizados && !imagemAtualizada) {
        console.log('Nenhuma alteração detectada no produto');
        return produtoAtual;
      }
      
      
      return produtoAtualizado || produtoAtual;
    }
    catch(error) {
      console.error('Erro ao atualizar produto:', error);
      return undefined;
    }
  }

  async deleteProduto(id: number): Promise<boolean> {
    try {
      const response = await this.http.delete<any>(`${this.apiUrl}/produto/${id}`).toPromise();
      if (response && response.status) {
        this._produtos = this._produtos.filter(p => p.id !== id);
        return true;
      }
      return false;
    }
    catch(error) {
      console.error('Erro ao deletar produto:', error);
      return false;
    }
  }

  get produtos(): Produto[] {
    return this._produtos;
  }

  set produtos(produtos: Produto[]) {
    this._produtos = produtos;
  }
}