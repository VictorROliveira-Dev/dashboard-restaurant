import { useState, FormEvent } from "react";
import { api } from "@/lib/axios";
import { LoaderCircle, Plus } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Product } from "../../lib/types"; // Importando o tipo Product
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface ProductCreateProps {
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  products: Product[];
}

export function ProductCreate({ setProducts, products }: ProductCreateProps) {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState<number>(0);
  const [nomeCategoria, setNomeCategoria] = useState<string>("");
  const [imagem, setImagem] = useState<File | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsAdding(true);

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
    formData.append("categoria", nomeCategoria);

    if (imagem) {
      formData.append("imagem", imagem);
    }

    try {
      const response = await api.post("/produto", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setProducts([...products, response.data.data]);
      setNome("");
      setDescricao("");
      setPreco(0);
      setNomeCategoria("");
      setImagem(null);
      toast.success("Produto adicionado com sucesso!", {
        className:
          "bg-slate-900 text-white font-semibold border-none shadow-lg",
        style: {
          borderRadius: "10px",
          padding: "16px",
        },
      });
    } catch (error: any) {
      toast.error("Erro ao tentar criar produto.", {
        className: "bg-red-500 text-white font-semibold border-none shadow-lg",
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
      setIsAdding(false);
    }
  };

  return (
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
                setPreco(e.target.value === "" ? 0 : parseFloat(e.target.value))
              }
              className="col-span-3 border-2"
              placeholder="Digite o preço..."
            />
          </div>

          <div className="grid grid-cols-4 items-center text-left">
            <Label htmlFor="category">Categoria</Label>
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
              variant="outline"
              className="w-full bg-white text-slate-950 hover:bg-slate-950 hover:text-white border-none"
              disabled={isAdding}
            >
              {isAdding ? (
                <LoaderCircle className="w-4 text-center animate-spin" />
              ) : (
                "Adicionar"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
