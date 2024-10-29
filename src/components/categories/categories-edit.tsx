import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { api } from "@/lib/axios";
import { toast } from "sonner";
import { LoaderCircle, Pen } from "lucide-react";
import { Label } from "../ui/label";

interface EditCategoryProps {
  categoria: { id: number; nome: string; imagem: string };
  onUpdate: (updatedCategoria: {
    id: number;
    nome: string;
    imagem: string;
  }) => void;
}

export function EditCategory({ categoria, onUpdate }: EditCategoryProps) {
  const [nome, setNome] = useState<string>(categoria.nome);
  const [imagem, setImagem] = useState<File | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("nome", nome);
    if (imagem) formData.append("imagem", imagem);

    setIsEditing(true);
    try {
      const response = await api.put(`/categoria/${categoria.id}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });
      onUpdate(response.data.data);
      toast.success("Categoria atualizada com sucesso!", {
        className:
          "bg-slate-900 text-white font-semibold border-none shadow-lg",
        style: {
          borderRadius: "10px",
          padding: "16px",
        },
      });
    } catch {
      toast.error("Erro ao tentar atualizar a categoria.", {
        className: "bg-red-500 text-white font-semibold border-none shadow-lg",
        style: {
          borderRadius: "10px",
          padding: "16px",
        },
      });
    } finally {
      setIsEditing(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="hover:bg-slate-950">
          <Pen className="text-yellow-500 w-4" />
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
            className="cursor-pointer"
            type="file"
            onChange={(e) =>
              setImagem(e.target.files ? e.target.files[0] : null)
            }
          />
          <Button
            className="bg-slate-50 text-foreground hover:bg-slate-950 hover:text-white mt-4"
            type="submit"
            disabled={isEditing}
          >
            {isEditing ? (
              <span className="flex justify-center items-center">
                <LoaderCircle className="animate-spin" />
              </span>
            ) : (
              "Salvar"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
