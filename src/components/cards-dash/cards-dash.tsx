import { Coins, PackageOpen, Percent, ShoppingBag } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import ChartOverview from "../chart/chart";

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
                R$ 40.000
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
              <p className="text-base sm:text-lg font-bold text-white">200</p>
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
              <p className="text-base sm:text-lg font-bold text-white">2500</p>
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
                R$ 12.500
              </p>
            </CardContent>
          </Card>
        </section>

        <section className="mt-4 flex flex-col md:flex-row gap-4">
          <ChartOverview />
        </section>
      </main>
    </>
  );
}
