export interface Produto {
    id?: number;
    nome: string;
    preco: number;
    quantidade: number;
    categoria: string;
    descricao?: string;
    imagem_url?: string;
  }