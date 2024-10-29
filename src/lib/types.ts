export interface Product {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  categoriaId?: number;
  imagem?: string;
  nomeCategoria: string
}

export interface Categoria {
  id: number,
  nome: string,
  imagem: string
}
