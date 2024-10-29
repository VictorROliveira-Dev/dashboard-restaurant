import { Pen, Plus, Search, Trash } from "lucide-react";
import { useState, useEffect } from "react";
import { api } from "@/lib/axios";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
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

export function Categories() {
  const token = localStorage.getItem("token");

  interface ListaCategoria {
    id: number;
    nome: string;
    imagem: string;
  }

  const navigate = useNavigate();
  const [nome, setNome] = useState<string>("");
  const [imagem, setImagem] = useState<File | null>(null);
  const [categoriaEdit, setCategoriaEdit] = useState<ListaCategoria | null>(
    null
  );
  const [categorias, setCategorias] = useState<ListaCategoria[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchCategorias = async () => {
      setIsLoading(true);

      if (!token) {
        navigate("/login");
      }

      try {
        const response = await api.get("/categoria", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
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
  }, []);

  useEffect(() => {
    if (categoriaEdit) {
      setNome(categoriaEdit.nome);
    }
  }, [categoriaEdit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsAdding(true);
    const formData = new FormData();
    formData.append("nome", nome);

    if (imagem) {
      formData.append("imagem", imagem);
    }

    try {
      if (categoriaEdit) {
        const response = await api.put(
          `/categoria/${categoriaEdit.id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        setCategorias(
          categorias.map((c) =>
            c.id === categoriaEdit.id ? response.data.data : c
          )
        );

        toast.success("categoria atualizada com sucesso");
      } else {
        const response = await api.post("/categoria", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });

        setCategorias([...categorias, response.data.data]);
        setNome("");
        setImagem(null);
        toast.success("Categoria criado com sucesso!");
      }
    } catch (error: any) {
      if (error.status == 401) {
        localStorage.removeItem("token");
        navigate("/login");
      }
      toast.error(
        "Erro ao tentar atualizar categoria, verifique se todos os campos foram digitados corretamente"
      );
    } finally {
      setIsAdding(false);
      setCategoriaEdit(null);
    }
  };

  const handleRemoverCategoria = async (categoriaId: number) => {
    try {
      const response = await api.delete(`/categoria/${categoriaId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (!response.data.isSucces) {
        toast.error(response.data.message);
      }

      setCategorias(categorias.filter((c) => c.id !== categoriaId));
    } catch (error: any) {
      if ((error.status = 401)) {
        localStorage.removeItem("token");
        navigate("/login");
      }
      toast.error(error);
    }
  };

  return (
    <>
      <div className="flex items-center md:h-screen h-[800px] p-1 bg-slate-950">
        <div className="mx-auto md:max-w-2xl md:w-[800px] w-[350px] space-y-4">
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
              />
              <Search className="mr-2 text-white" size={30} />
            </form>
            <Dialog open={dialogOpen || categoriaEdit != null}>
              <DialogTrigger asChild>
                <Button onClick={() => setDialogOpen(true)}>
                  <Plus className="w-4 mr-2" />
                  Nova Categoria
                </Button>
              </DialogTrigger>

              <DialogContent className="bg-slate-900 border-none text-white">
                {categoriaEdit ? (
                  <DialogHeader>
                    <DialogTitle>Editar Categoria</DialogTitle>
                    <DialogDescription>
                      Crie uma nova categoria
                    </DialogDescription>
                  </DialogHeader>
                ) : (
                  <DialogHeader>
                    <DialogTitle>Nova Categoria</DialogTitle>
                    <DialogDescription>
                      Crie uma nova categoria
                    </DialogDescription>
                  </DialogHeader>
                )}
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-4 items-center text-right gap-3">
                    <Label htmlFor="name">Categoria</Label>
                    <Input
                      id="name"
                      className="col-span-3 border-2"
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-4 items-center text-right gap-3">
                    <Label htmlFor="price">Foto</Label>
                    {categoriaEdit && <img src={categoriaEdit.imagem} alt="" />}
                    <input
                      type="file"
                      id="image"
                      accept="image/*"
                      onChange={(e) =>
                        setImagem(e.target.files ? e.target.files[0] : null)
                      } // Ao selecionar um arquivo, executa handleImageChange
                    />
                  </div>

                  <DialogFooter>
                    <DialogClose asChild>
                      <Button
                        onClick={() => {
                          setDialogOpen(false);
                          setCategoriaEdit(null);
                        }}
                        variant="destructive"
                      >
                        Cancelar
                      </Button>
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
                        "Salvar"
                      )}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
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
                  <TableHead className="text-white font-bold text-center md:text-start">
                    Foto
                  </TableHead>
                  <TableHead className="text-white font-bold text-center md:text-start">
                    Produto
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="text-white text-center">
                {categorias.length > 0 ? (
                  categorias.map((categoria) => (
                    <TableRow
                      key={categoria.id}
                      className="hover:bg-slate-900 text-center md:text-start"
                    >
                      <TableCell>
                        <img
                          src={categoria.imagem}
                          alt={categoria.nome}
                          loading="lazy"
                          className="w-12 h-12 object-cover rounded-md"
                        />
                      </TableCell>
                      <TableCell>{categoria.nome}</TableCell>
                      <TableCell className="flex gap-2 mt-1 items-center justify-center">
                        <Button className="hover:bg-slate-950">
                          <Pen
                            onClick={() => setCategoriaEdit(categoria)}
                            className="text-yellow-500"
                          />
                        </Button>
                        <Button className="hover:bg-slate-950">
                          <Trash
                            onClick={() => handleRemoverCategoria(categoria.id)}
                            className="text-red-500"
                          />
                        </Button>
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
    </>
  );
}
