export interface Product {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  categoriaId: number;
  imagem?: string;
  nomeCategoria: string;
}

export interface Categoria {
  id: number;
  nome: string;
  imagem: string;
}

export interface ItemPedido {
  produtoId: Number;
  produto: Product;
  pedidoId: Number;
  quantidade: Number;
  precoUnitario: Number;
}

export interface Pedido {
  id: number;
  telefoneCliente: string;
  nomeCliente: string;
  endereco: string;
  items: ItemPedido[];
  status: number;
  formaDePagamento: number;
  code: string;
  data: string;
  totalPrice: number;
}
