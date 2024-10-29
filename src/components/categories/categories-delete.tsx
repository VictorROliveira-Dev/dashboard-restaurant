import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { Trash } from "lucide-react";
import { api } from "@/lib/axios";
import { toast } from "sonner";

interface DeleteCategoryProps {
  categoriaId: number;
  onDelete: () => void;
}

export function DeleteCategory({ categoriaId, onDelete }: DeleteCategoryProps) {
  const handleDelete = async () => {
    try {
      const response = await api.delete(`/categoria/${categoriaId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      if (response.data.isSucces) {
        onDelete();
        toast.success("Categoria excluída com sucesso!", {
          className:
            "bg-slate-900 text-white font-semibold border-none shadow-lg",
          style: {
            borderRadius: "10px",
            padding: "16px",
          },
        });
      } else {
        toast.error("Erro ao tentar excluir categoria.", {
          className:
            "bg-red-500 text-white font-semibold border-none shadow-lg",
          style: {
            borderRadius: "10px",
            padding: "16px",
          },
        });
      }
    } catch {
      toast.error("Erro ao tentar excluir a categoria.", {
        className: "bg-red-500 text-white font-semibold border-none shadow-lg",
        style: {
          borderRadius: "10px",
          padding: "16px",
        },
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="hover:bg-slate-950">
          <Trash className="text-red-500 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-slate-900 border-none text-white">
        <p>Tem certeza de que deseja excluir esta categoria?</p>
        <Button onClick={handleDelete} variant="destructive">
          Excluir
        </Button>
      </DialogContent>
    </Dialog>
  );
}
