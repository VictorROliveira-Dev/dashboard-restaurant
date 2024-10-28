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
  const [isLoading, setIsLoading] = useState<boolean>(true); // Estado de carregamento
  const [isAdding, setIsAdding] = useState<boolean>(false); // Estado de adição de produto
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
        setIsLoading(false); // Finaliza o estado de carregamento
      }
    };

    fetchCategorias();
  }, []);

  useEffect(() => {
    if (categoriaEdit) {
      setNome(categoriaEdit.nome); // Define o nome da categoria no estado
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
    } catch (error) {
      if (error.status == 401) {
        localStorage.removeItem("token");
        navigate("/login");
      }
      toast.error(
        "Erro ao tentar atualizar categoria, verifique se todos os campos foram digitados corretamente"
      );
    } finally {
      setIsAdding(false);
      setCategoriaEdit(null); // Termina o estado de "adicionando..."
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
    } catch (error) {
      if ((error.status = 401)) {
        localStorage.removeItem("token");
        navigate("/login");
      }
      toast.error(error);
    }
  };

  return (
    <>
      <div className="flex items-center h-screen p-1 bg-slate-950">
        <div className="mx-auto md:max-w-4xl space-y-4">
          <h1 className="text-white md:text-4xl text-2xl font-semibold">
            Categorias:
          </h1>

          <div className="flex items-center justify-between">
            <form className="flex items-center gap-2">
              <Input
                name="name"
                placeholder="Nome da categoria..."
                className="border-2 text-white"
              />
              <Button className="mr-2">
                <Search className="w-4 mr-2" />
                Filtrar
              </Button>
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

          <div className=" text-white md:w-[1000px] p-2">
            {isLoading ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              <Table>
                <TableHeader className="border-b-2">
                  <TableHead className="text-white font-bold">ID</TableHead>
                  <TableHead className="text-white font-bold">Imagem</TableHead>
                  <TableHead className="text-white font-bold">
                    Categoria
                  </TableHead>
                </TableHeader>
                <TableBody className="md:text-start text-center">
                  {categorias.map((categoria) => (
                    <TableRow key={categoria.id}>
                      <TableCell>{categoria.id}</TableCell>
                      <TableCell>
                        <img
                          src={categoria.imagem}
                          alt=""
                          className="h-12 w-12 rounded-full object-cover"
                        />
                      </TableCell>
                      <TableCell>{categoria.nome}</TableCell>

                      <TableCell>
                        <Button
                          onClick={() => setCategoriaEdit(categoria)}
                          className="bg-transparent"
                          size="sm"
                        >
                          <Pen className="w-5" />
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Button
                          onClick={() => handleRemoverCategoria(categoria.id)}
                          className="bg-transparent"
                          size="sm"
                        >
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
