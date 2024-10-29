export interface Product {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  categoriaId: number;
  imagem?: string;
}
