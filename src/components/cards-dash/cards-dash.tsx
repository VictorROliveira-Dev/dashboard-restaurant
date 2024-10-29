import { Coins, PackageOpen, Percent, ShoppingBag } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import ChartOverview from "../chart/chart";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

export function CardsDash() {
  return (
    <>
      <main className="sm:ml-14 p-4 bg-slate-950 sm:h-screen">
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-slate-900 border-none">
            <CardHeader>
              <div className="flex items-center justify-center">
                <CardTitle className="text-lg sm:text-xl text-white select-none">
                  Vendas Gerais:
                </CardTitle>
                <Coins className="ml-auto w-6 h-6 text-white" />
              </div>

              <CardDescription className="font-medium text-slate-400">
                Total de vendas em 90 dias:
              </CardDescription>
            </CardHeader>

            <CardContent>
              <p className="text-base text-white sm:text-lg font-bold">
                R$ 0.00
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-none">
            <CardHeader>
              <div className="flex items-center justify-center">
                <CardTitle className="text-lg sm:text-xl text-white select-none">
                  Pedidos Atuais:
                </CardTitle>
                <Percent className="ml-auto w-6 h-6 text-white" />
              </div>

              <CardDescription className="font-medium text-slate-400">
                Total de pedidos de hoje:
              </CardDescription>
            </CardHeader>

            <CardContent>
              <p className="text-base sm:text-lg font-bold text-white">0</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-none">
            <CardHeader>
              <div className="flex items-center justify-center">
                <CardTitle className="text-lg sm:text-xl text-white select-none">
                  Pedidos Gerais:
                </CardTitle>
                <ShoppingBag className="ml-auto w-6 h-6 text-white" />
              </div>

              <CardDescription className="font-medium text-slate-400">
                Total de pedidos em 30 dias:
              </CardDescription>
            </CardHeader>

            <CardContent>
              <p className="text-base sm:text-lg font-bold text-white">0</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-none">
            <CardHeader>
              <div className="flex items-center justify-center">
                <CardTitle className="text-lg sm:text-xl text-white select-none">
                  Vendas Atuais:
                </CardTitle>
                <PackageOpen className="ml-auto w-6 h-6 text-white" />
              </div>

              <CardDescription className="font-medium text-slate-400">
                Total de vendas nesse mês:
              </CardDescription>
            </CardHeader>

            <CardContent>
              <p className="text-base sm:text-lg font-bold text-white">
                R$ 0.00
              </p>
            </CardContent>
          </Card>
        </section>

        <section className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <ChartOverview />

          <Card className="w-full bg-slate-900 border-none">
            <CardHeader className="flex md:flex-row items-center justify-between">
              <CardTitle className="text-lg text-white">
                Produtos Mais Pedidos:
              </CardTitle>
              <Select>
                <SelectTrigger className="w-[220px] text-white border-2">
                  <SelectValue placeholder="Selecione uma categoria" />
                </SelectTrigger>
                <SelectContent className="bg-slate-950 text-white border-none">
                  <SelectGroup>
                    <SelectLabel className="font-bold">Categorias</SelectLabel>
                    <SelectItem className="cursor-pointer" value="lanches">
                      Lanches
                    </SelectItem>
                    <SelectItem className="cursor-pointer" value="bebidas">
                      Bebidas
                    </SelectItem>
                    <SelectItem className="cursor-pointer" value="refeicoes">
                      Refeições
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </CardHeader>
            <CardContent className="flex flex-col gap-8 items-center">
              <Table>
                <TableHeader className="border-b-2">
                  <TableRow className="hover:bg-slate-950">
                    <TableHead className="text-white font-bold text-center">
                      Foto
                    </TableHead>
                    <TableHead className="text-white font-bold text-center">
                      Produto
                    </TableHead>
                    <TableHead className="text-white font-bold text-center">
                      Descrição
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="text-white md:text-center text-center">
                  {Array.from({ length: 5 }).map((_, i) => {
                    return (
                      <TableRow className="hover:bg-slate-950">
                        <TableCell>Foto {i} </TableCell>
                        <TableCell>Produto {i} </TableCell>
                        <TableCell>Descrição {i} </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>

              <a href="/produto" className="w-[150px] text-sm text-center px-1 py-2 rounded-md font-medium cursor-pointer bg-slate-50 text-foreground hover:bg-slate-950 hover:text-white transition-all">
                Ver Todos
              </a>
            </CardContent>
          </Card>
        </section>
      </main>
    </>
  );
}
