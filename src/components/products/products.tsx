import { Pen, Plus, Search, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
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

export function Products() {
  return (
    <>
      <div className="flex items-center h-screen p-1 bg-slate-950">
        <div className="mx-auto md:max-w-4xl space-y-4">
          <h1 className="text-white md:text-4xl text-2xl font-semibold">Produtos:</h1>

          <div className="flex items-center justify-between">
            <form className="flex items-center gap-2">
              <Input
                name="name"
                placeholder="Nome do produto..."
                className="border-2 text-white"
              />
              <Button className="mr-2">
                <Search className="w-4 mr-2" />
                Filtrar
              </Button>
            </form>

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
                  <DialogDescription>Crie um novo produto</DialogDescription>
                </DialogHeader>

                <form className="space-y-6">
                  <div className="grid grid-cols-4 items-center text-right gap-3">
                    <Label htmlFor="name">Produto</Label>
                    <Input id="name" className="col-span-3 border-2" />
                  </div>

                  <div className="grid grid-cols-4 items-center text-right gap-3">
                    <Label htmlFor="price">Preço</Label>
                    <Input id="price" className="col-span-3 border-2" />
                  </div>

                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="destructive">Cancelar</Button>
                    </DialogClose>
                    <Button
                      type="submit"
                      variant="outline"
                      className="text-slate-950"
                    >
                      Salvar
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <div className=" text-white md:w-[1000px] p-2">
            <Table>
              <TableHeader className="border-b-2">
                <TableHead className="text-white font-bold">Produto</TableHead>
                <TableHead className="text-white font-bold">Preço</TableHead>
                <TableHead className="text-white font-bold">
                  Quantidade
                </TableHead>
              </TableHeader>
              <TableBody className="md:text-start text-center">
                {Array.from({ length: 6 }).map((_, i) => {
                  return (
                    <TableRow>
                      <TableCell>Produto {i}</TableCell>
                      <TableCell>R$ 1{i * 12}</TableCell>
                      <TableCell>1{i * 2}</TableCell>
                      <TableCell>
                        <Button className="bg-transparent" size="sm">
                          <Pen className="w-5" />
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Button className="bg-transparent" size="sm">
                          <Trash className="w-5" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
}
