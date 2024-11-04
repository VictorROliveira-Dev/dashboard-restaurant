import { useEffect, useState } from "react";
import { api } from "@/lib/axios";
import { ProductCreate } from "../products/product-create";
import { ProductEdit } from "../products/product-edit";
import { ProductDelete } from "../products/product-delete";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import {
  ChevronLeft,
  ChevronRight,
  LoaderCircle,
  Pen,
  Search,
} from "lucide-react";
import { Product } from "../../lib/types";
import { Input } from "../ui/input";
import { toast } from "sonner";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "../ui/pagination";

export function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [searchProduct, setSearchProduct] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      const token = localStorage.getItem("token");
      setIsLoading(true);

      try {
        // Capturando produtos existentes no banco
        const response = await api.get("/produto", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // Atualizando o estado do produto para receber um produto
        setProducts(response.data.data);
      } catch (error) {
        toast.error("Erro ao tentar recuperar os produtos.", {
          className:
            "bg-red-500 text-white font-semibold border-none shadow-lg",
          style: {
            borderRadius: "10px",
            padding: "16px",
          },
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filtrando produtos para realizar a busca no input
  const filteredProducts = products.filter((product) => {
    if (!product.nome) return false;

    return product.nome.toLowerCase().includes(searchProduct.toLowerCase());
  });

  return (
    <div className="flex items-center md:h-screen h-[800px] p-1 bg-slate-950">
      <div className="mx-auto md:max-w-4xl md:w-[1000px] w-[350px] space-y-4">
        <h1 className="text-white md:text-4xl text-2xl font-semibold">
          Produtos:
        </h1>

        <div className="flex items-center justify-between">
          <form
            className="flex items-center gap-2"
            onSubmit={(e) => e.preventDefault()}
          >
            <Input
              name="name"
              className="border-2 text-white"
              placeholder="Nome do produto..."
              value={searchProduct}
              onChange={(e) => setSearchProduct(e.target.value)}
            />
            <Search className="mr-2 text-white" size={30} />
          </form>

          <ProductCreate setProducts={setProducts} products={products} />
        </div>

        {isLoading ? (
          <div className="text-white flex justify-center overflow-y-scroll scrollbar-hide">
            <span className="flex justify-center items-center">
              <LoaderCircle className="animate-spin" />
            </span>
          </div>
        ) : (
          <Table>
            <TableHeader className="border-b-2">
              <TableRow>
                <TableHead className="text-white font-bold text-center">
                  Foto
                </TableHead>
                <TableHead className="text-white font-bold text-center">
                  Produto
                </TableHead>
                <TableHead className="text-white font-bold text-center">
                  Descrição
                </TableHead>
                <TableHead className="text-white font-bold text-center">
                  Preço
                </TableHead>
                <TableHead className="text-white font-bold text-center">
                  Categoria
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="text-white text-center">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <TableRow key={product.id} className="hover:bg-slate-900">
                    <TableCell>
                      <img
                        src={product.imagem}
                        alt={product.nome}
                        loading="lazy"
                        className="w-12 object-cover rounded-md"
                      />
                    </TableCell>
                    <TableCell>{product.nome}</TableCell>
                    <TableCell>{product.descricao}</TableCell>
                    <TableCell>
                      {product.preco.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </TableCell>
                    <TableCell>{product.nomeCategoria}</TableCell>
                    <TableCell className="flex gap-2 mt-1 justify-center">
                      <Button
                        onClick={() => {
                          setEditingProduct(product);
                          setIsEditDialogOpen(true);
                        }}
                        className="hover:bg-slate-950"
                      >
                        <Pen className="w-4 text-yellow-500" />
                      </Button>
                      <ProductDelete
                        productId={product.id}
                        setProducts={setProducts}
                        products={products}
                      />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-white">
                    Nenhum produto encontrado.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
        <Pagination>
          <PaginationContent className="text-white">
            <PaginationItem>
              <a
                href="#"
                className="flex items-center gap-1 cursor-pointer text-sm"
              >
                <ChevronLeft size={20} />
                Anterior
              </a>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" className="text-black" isActive>
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <a
                href="#"
                className="flex items-center gap-1 cursor-pointer text-sm"
              >
                Próxima
                <ChevronRight size={20} />
              </a>
            </PaginationItem>
          </PaginationContent>
        </Pagination>

        {editingProduct && (
          <ProductEdit
            product={editingProduct}
            setProducts={setProducts}
            products={products}
            isOpen={isEditDialogOpen}
            setIsOpen={setIsEditDialogOpen}
          />
        )}
      </div>
    </div>
  );
}
