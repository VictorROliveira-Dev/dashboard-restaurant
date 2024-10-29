import { useState } from "react";
import { api } from "@/lib/axios";
import { Button } from "../ui/button";
import { LoaderCircle, Trash } from "lucide-react";
import { Product } from "../../lib/types";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface ProductDeleteProps {
  productId: number;
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  products: Product[];
}

export function ProductDelete({
  productId,
  setProducts,
  products,
}: ProductDeleteProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async () => {
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

    setIsDeleting(true);

    try {
      const response = await api.delete(`/produto/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.data.isSuccess) {
        return;
      }

      setProducts(products.filter((product) => product.id !== productId));
      toast.success("Produto removido com sucesso!", {
        className:
          "bg-slate-900 text-white font-semibold border-none shadow-lg",
        style: {
          borderRadius: "10px",
          padding: "16px",
        },
      });
    } catch (error: any) {
      toast.error("Erro ao tentar remover produto.", {
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
      setIsDeleting(false);
    }
  };

  return (
    <Button
      onClick={handleDelete}
      disabled={isDeleting}
      className="text-red-500 hover:bg-slate-950"
    >
      {isDeleting ? (
        <LoaderCircle className="w-4 animate-spin" />
      ) : (
        <Trash className="w-4" />
      )}
    </Button>
  );
}
