import { LoaderCircle, Pen, Plus, Search, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { useEffect, useState } from "react";
import { api } from "@/lib/axios";

interface ProductList {
  id?: number;
  nome: string;
  descricao: string;
  preco: number;
  categoriaId: number;
}

export function Products() {
  const [nome, setNome] = useState<string>("");
  const [descricao, setDescricao] = useState<string>("");
  const [preco, setPreco] = useState<number>(0);
  const [categoriaId, setCategoriaId] = useState<number>(1);
  const [products, setProducts] = useState<ProductList[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true); // Estado de carregamento
  const [isAdding, setIsAdding] = useState<boolean>(false); // Estado de adição de produto

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAdding(true); // Inicia o estado de "adicionando..."

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Usuário não autênticado.");
      return;
    }

    const formData = new FormData();
    formData.append("nome", nome);
    formData.append("descricao", descricao);
    formData.append("preco", preco.toString());
    formData.append("categoriaId", categoriaId.toString());

    try {
      const response = await api.post("/produto", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      // Adiciona o produto recém-criado à lista de produtos sem precisar recarregar a página
      setProducts([...products, response.data.data]);
      setNome("");
      setDescricao("");
      setPreco(0);
      setCategoriaId(1);
      alert("Produto criado com sucesso!");
    } catch (error) {
      alert("Erro ao criar o produto.");
    } finally {
      setIsAdding(false); // Termina o estado de "adicionando..."
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const token = localStorage.getItem("token");
      setIsLoading(true); // Inicia o estado de carregamento

      try {
        const response = await api.get("/produto", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          setProducts(
            Array.isArray(response.data.data) ? response.data.data : []
          );
        }
      } catch (error: any) {
        if (error.response && error.response.status === 401) {
          alert("Please login to view the products.");
        }
      } finally {
        setIsLoading(false); // Finaliza o estado de carregamento
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <div className="flex items-center h-screen p-1 bg-slate-950">
        <div className="mx-auto md:max-w-4xl space-y-4">
          <h1 className="text-white md:text-4xl text-2xl font-semibold">
            Produtos:
          </h1>

          <div className="flex items-center justify-between">
            <form className="flex items-center gap-2">
              <Input
                name="name"
                className="border-2 text-white"
                placeholder="Nome do produto..."
              />
              <Button className="mr-2">
                <Search className="w-4 mr-2" />
                Filtrar
              </Button>
            </form>

            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 mr-2" />
                  Novo Produto
                </Button>
              </DialogTrigger>

              <DialogContent className="bg-slate-900 border-none text-white">
                <DialogHeader>
                  <DialogTitle>Novo Produto</DialogTitle>
                  <DialogDescription>Crie um novo produto</DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-4 items-center text-right gap-3">
                    <Label htmlFor="nome">Produto</Label>
                    <Input
                      id="nome"
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                      required
                      className="col-span-3 border-2"
                      placeholder="Digite o nome do produto..."
                    />
                  </div>

                  <div className="grid grid-cols-4 items-center text-right gap-3">
                    <Label htmlFor="descricao">Descrição</Label>
                    <Input
                      id="descricao"
                      value={descricao}
                      onChange={(e) => setDescricao(e.target.value)}
                      required
                      className="col-span-3 border-2"
                      placeholder="Digite a descrição do produto..."
                    />
                  </div>

                  <div className="grid grid-cols-4 items-center text-right gap-3">
                    <Label htmlFor="price">Preço</Label>
                    <Input
                      id="price"
                      value={preco === 0 ? "" : preco}
                      onChange={(e) =>
                        setPreco(
                          e.target.value === "" ? 0 : parseFloat(e.target.value)
                        )
                      }
                      className="col-span-3 border-2"
                      placeholder="Digite o preço..."
                    />
                  </div>

                  <div className="grid grid-cols-4 items-center text-right gap-3">
                    <Label htmlFor="category">ID Categoria</Label>
                    <Input
                      id="category"
                      value={categoriaId === 0 ? "" : categoriaId}
                      onChange={(e) =>
                        setCategoriaId(
                          e.target.value === "" ? 0 : parseInt(e.target.value)
                        )
                      }
                      className="col-span-3 border-2"
                    />
                  </div>

                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="destructive">Cancelar</Button>
                    </DialogClose>
                    <Button
                      type="submit"
                      variant="outline"
                      className="text-slate-950"
                      disabled={isAdding}
                    >
                      {isAdding ? (
                        <LoaderCircle className="animate-spin " />
                      ) : (
                        "Criar Produto"
                      )}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <div className="text-white md:w-[1000px] p-2">
            {isLoading ? (
              <span className="flex justify-center items-center">
                <LoaderCircle className="animate-spin " />
              </span>
            ) : (
              <Table>
                <TableHeader className="border-b-2">
                  <TableRow>
                    <TableHead className="text-white font-bold">
                      Produto
                    </TableHead>
                    <TableHead className="text-white font-bold">
                      Descrição
                    </TableHead>
                    <TableHead className="text-white font-bold">
                      Preço
                    </TableHead>
                    <TableHead className="text-white font-bold">
                      ID Categoria
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="md:text-start text-center">
                  {products.map((product, i) => (
                    <TableRow key={i}>
                      <TableCell>{product.nome}</TableCell>
                      <TableCell>{product.descricao}</TableCell>
                      <TableCell>{product.preco}</TableCell>
                      <TableCell>{product.categoriaId}</TableCell>
                      <TableCell>
                        <Button className="bg-transparent" size="sm">
                          <Pen className="w-5" />
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Button className="bg-transparent" size="sm">
                          <Trash className="w-5" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
