import { useState, FormEvent, useEffect } from "react";
import { api } from "@/lib/axios";
import { LoaderCircle } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Product } from "../../lib/types";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface ProductEditProps {
  product: Product;
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  products: Product[];
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function ProductEdit({
  product,
  setProducts,
  products,
  isOpen,
  setIsOpen,
}: ProductEditProps) {
  const [nome, setNome] = useState(product.nome);
  const [descricao, setDescricao] = useState(product.descricao);
  const [preco, setPreco] = useState<number>(product.preco);
  const [nomeCategoria, setNomeCategoria] = useState<string>(
    product.nomeCategoria
  );
  const [imagem, setImagem] = useState<File | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const navigate = useNavigate();

  // Limpando os itens do produto para cada nova requisição feita
  useEffect(() => {
    setNome(product.nome);
    setDescricao(product.descricao);
    setPreco(product.preco);
    setNomeCategoria(product.nomeCategoria);
    setImagem(null);
  }, [product]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsEditing(true);

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Usuário não autênticado.", {
        className: "bg-red-500 text-white font-semibold border-none shadow-lg",
        style: {
          borderRadius: "10px",
          padding: "16px",
        },
      });
      return;
    }

    const formData = new FormData();
    formData.append("nome", nome);
    formData.append("descricao", descricao);
    formData.append("preco", preco.toString());
    formData.append("nomeCategoria", nomeCategoria);

    if (imagem) {
      formData.append("imagem", imagem);
    }

    try {
      const response = await api.put(`/produto/${product.id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      // Atribuindo resposta para uma variável produto
      const updatedProduct = response.data.data;

      // Verificando e atualizando o produto, casa o id seja igual ao do id passado na solicitação,
      // em caso de ser igual, passa os dados do produto atualizado
      const updatedProducts = products.map((p) =>
        p.id === updatedProduct.id ? updatedProduct : p
      );
      setProducts(updatedProducts);
      toast.success("Produto atualizado com sucesso!", {
        className:
          "bg-slate-900 text-white font-semibold border-none shadow-lg",
        style: {
          borderRadius: "10px",
          padding: "16px",
        },
      });
      setIsOpen(false);
    } catch (error: any) {
      toast.error("Erro ao tentar adicionar produto.", {
        className:
          "bg-slate-950 text-white font-semibold border-none shadow-lg",
        style: {
          borderRadius: "10px",
          padding: "16px",
        },
      });
      if (error.response.status == 401) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    } finally {
      setIsEditing(false);
      setIsOpen(false);
    }
  };

  return (
    isOpen && (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="bg-slate-900 border-none text-white">
          <DialogHeader>
            <DialogTitle>Editar Produto</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-4 items-center text-left">
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

            <div className="grid grid-cols-4 items-center text-left">
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

            <div className="grid grid-cols-4 items-center text-left">
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

            <div className="grid grid-cols-4 items-center text-left">
              <Label htmlFor="category">ID Categoria</Label>
              <Input
                id="category"
                value={nomeCategoria}
                onChange={(e) => setNomeCategoria(e.target.value)}
                className="col-span-3 border-2"
                placeholder="Digite o nome da categoria..."
              />
            </div>

            <div className="grid grid-cols-4 items-center text-left">
              <Label htmlFor="imagem">Imagem</Label>
              <input
                type="file"
                id="imagem"
                onChange={(e) =>
                  setImagem(e.target.files ? e.target.files[0] : null)
                }
                className="col-span-3 border-2"
              />
            </div>

            <DialogFooter>
              <Button
                type="submit"
                className="w-full bg-white text-foreground hover:bg-slate-950 hover:text-white"
                disabled={isEditing}
              >
                {isEditing ? (
                  <LoaderCircle className="w-4 mr-2 animate-spin" />
                ) : (
                  "Salvar"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    )
  );
}
