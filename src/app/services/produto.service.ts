import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Produto } from '../models/produto';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  private _produtos: Produto[] = [];
  private apiUrl = 'http://localhost:8080/api';

  constructor(
    private http: HttpClient
  ) {
  }

  async getProdutos(){
    try {
      const produtos = await this.http.get<Produto[]>(`${this.apiUrl}/produto`).toPromise();
      if (produtos){
        this._produtos = produtos;
      }
    } 
    catch(error){
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
  
  
        const response = await this.http.put<any>(`${this.apiUrl}/produto/${produto.id}`, formData).toPromise();
        
        if (response && response.status) {
          const produtoAtualizado = response.produto;
          const index = this._produtos.findIndex(p => p.id === produto.id);
          if (index !== -1) {
            this._produtos[index] = produtoAtualizado;
          }
          return produtoAtualizado;
        }
      } else {
        
        const response = await this.http.put<any>(`${this.apiUrl}/produto/${produto.id}`, produto).toPromise();
        
        if (response && response.status) {
          const produtoAtualizado = response.produto;
          const index = this._produtos.findIndex(p => p.id === produto.id);
          if (index !== -1) {
            this._produtos[index] = produtoAtualizado;
          }
          return produtoAtualizado;
        }
      }
      return undefined;
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