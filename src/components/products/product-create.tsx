import { useState, FormEvent, useEffect } from "react";
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
import { Product } from "../../lib/types";
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
  const [categoriaId, setCategoriaId] = useState<number>(0);
  const [imagem, setImagem] = useState<File | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [categorias, setCategorias] = useState<{ id: number; nome: string }[]>(
    []
  );

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await api.get("/categoria");
        setCategorias(response.data.data);
      } catch (error: any) {
        toast.error("Erro ao carregar categorias.", {
          className:
            "bg-red-500 text-white font-semibold border-none shadow-lg",
          style: {
            borderRadius: "10px",
            padding: "16px",
          },
        });
      }
    };
    fetchCategorias();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsAdding(true);

    // Capturando token no local storage
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

    // Por ser um formulário na API, deve-se enviar em um "FormData" os dados
    const formData = new FormData();
    formData.append("nome", nome);
    formData.append("descricao", descricao);
    formData.append("preco", preco.toString());
    formData.append("categoriaId", categoriaId.toString());

    if (imagem) {
      formData.append("imagem", imagem);
    }

    try {
      // Capturando resposta da requisição post
      const response = await api.post("/produto", formData, {
        // Solicitando autorização através de um token
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      // Atualizando o estado da lista de produtos com o novo produto
      setProducts([...products, response.data.data]);
      console.log(response.data.data);
      // Limpando os campos para o valor padrão
      setNome("");
      setDescricao("");
      setPreco(0);
      setCategoriaId(0);
      setImagem(null);
      // Mensagem em caso de sucesso
      toast.success("Produto adicionado com sucesso!", {
        className:
          "bg-slate-900 text-white font-semibold border-none shadow-lg",
        style: {
          borderRadius: "10px",
          padding: "16px",
        },
      });
    } catch (error: any) {
      // Mensagem em caso de erro
      toast.error("Erro ao tentar criar produto.", {
        className: "bg-red-500 text-white font-semibold border-none shadow-lg",
        style: {
          borderRadius: "10px",
          padding: "16px",
        },
      });
      // Logout do usuário em caso de erro "Unauthorized"
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
            <select
              id="category"
              value={categoriaId}
              onChange={(e) =>
                setCategoriaId(
                  e.target.value === "" ? 0 : parseFloat(e.target.value)
                )
              }
              className="bg-transparent col-span-3 border-2 text-white rounded-md p-1 cursor-pointer"
            >
              <option className="bg-slate-900" value={0}>Selecione uma categoria...</option>
              {categorias.map((categoria) => (
                <option className="bg-slate-900" key={categoria.id} value={categoria.id}>
                  {categoria.nome}
                </option>
              ))}
            </select>
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
