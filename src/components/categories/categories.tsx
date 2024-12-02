import { useEffect, useState } from "react";
import { api } from "@/lib/axios";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { LoaderCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { CreateCategory } from "../categories/create-category";
import { EditCategory } from "../categories/categories-edit";
import { DeleteCategory } from "../categories/categories-delete";
import { Categoria } from "@/lib/types";

export function Categories() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategorias = async () => {
      setIsLoading(true);
      if (!token) navigate("/login");

      try {
        const response = await api.get("/categoria", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.data.isSucces) {
          setCategorias(
            Array.isArray(response.data.data) ? response.data.data : []
          );
        }
      } catch (error: any) {
        if (error.status == 401) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategorias();
  }, [token, navigate]);

  const handleRemoverCategoria = async (categoriaId: number) => {
    try {
      const response = await api.delete(`/categoria/${categoriaId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      if (!response.data.isSucces) toast.error(response.data.message);
      setCategorias(categorias.filter((c) => c.id !== categoriaId));
    } catch (error: any) {
      if (error.status == 401) {
        localStorage.removeItem("token");
        navigate("/login");
      }
      toast.error(error);
    }
  };

  return (
    <div className="flex md:items-center md:h-screen h-[607px] md:p-1 px-1 py-10 bg-slate-950">
      <div className="mx-auto md:max-w-2xl md:w-[800px] w-[350px] space-y-4">
        <h1 className="text-white md:text-4xl text-2xl font-semibold">
          Categorias:
        </h1>
        <CreateCategory
          onAdd={(newCategoria) => setCategorias([...categorias, newCategoria])}
        />

        {isLoading ? (
          <span className="flex justify-center">
          <LoaderCircle className="animate-spin text-white" />
          </span>
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
              </TableRow>
            </TableHeader>
            <TableBody className="text-white text-center">
              {categorias.length > 0 ? (
                categorias.map((categoria) => (
                  <TableRow key={categoria.id} className="hover:bg-slate-900">
                    <TableCell>
                      <img
                        src={categoria.imagem}
                        alt={categoria.nome}
                        className="w-12 h-12"
                      />
                    </TableCell>
                    <TableCell>{categoria.nome}</TableCell>
                    <TableCell className="flex gap-2 mt-1 justify-center">
                      <EditCategory
                        categoria={categoria}
                        onUpdate={(updatedCategoria) =>
                          setCategorias(
                            categorias.map((c) =>
                              c.id === updatedCategoria.id
                                ? updatedCategoria
                                : c
                            )
                          )
                        }
                      />
                      <DeleteCategory
                        categoriaId={categoria.id}
                        onDelete={() => handleRemoverCategoria(categoria.id)}
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
      </div>
    </div>
  );
}
