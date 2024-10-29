import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { api } from "@/lib/axios";
import { toast } from "sonner";
import { LoaderCircle, Plus } from "lucide-react";
import { Input } from "../ui/input";
import { Categoria } from "@/lib/types";
import { Label } from "../ui/label";

interface CreateCategoryProps {
  onAdd: (novaCategoria: Categoria) => void;
}

export function CreateCategory({ onAdd }: CreateCategoryProps) {
  const [nome, setNome] = useState<string>("");
  const [imagem, setImagem] = useState<File | null>(null);
  const [isAdding, setIsAdding] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("nome", nome);
    if (imagem) formData.append("imagem", imagem);

    setIsAdding(true);
    try {
      const response = await api.post("/categoria", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });
      onAdd(response.data.data);
      setNome("");
      setImagem(null);
      toast.success("Categoria criada com sucesso!", {
        className:
          "bg-slate-900 text-white font-semibold border-none shadow-lg",
        style: {
          borderRadius: "10px",
          padding: "16px",
        },
      });
    } catch {
      toast.error("Erro ao tentar criar um produto.", {
        className: "bg-red-500 text-white font-semibold border-none shadow-lg",
        style: {
          borderRadius: "10px",
          padding: "16px",
        },
      });
      setNome("");
      setImagem(null);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus className="w-4 mr-2" />
          Nova Categoria
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-slate-900 border-none text-white p-10">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Label htmlFor="nome">Nome</Label>
          <Input
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Nome da Categoria"
          />
          <Label htmlFor="imagem">Imagem</Label>
          <input
            id="imagem"
            type="file"
            onChange={(e) =>
              setImagem(e.target.files ? e.target.files[0] : null)
            }
          />
          <Button
            className="bg-slate-50 text-foreground hover:bg-slate-950 hover:text-white mt-4"
            type="submit"
            disabled={isAdding}
          >
            {isAdding ? (
              <span className="flex justify-center items-center">
                <LoaderCircle className="animate-spin" />
              </span>
            ) : (
              "Criar"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
