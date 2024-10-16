import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

export function Orders() {
  return (
    <>
      <section className="bg-slate-950 h-screen flex items-center justify-center">
        <Tabs defaultValue="all" className="md:w-[600px] w-[380px]">
          <TabsList className="grid w-full grid-cols-4 bg-slate-900 text-white">
            <TabsTrigger value="all">Todos</TabsTrigger>
            <TabsTrigger value="open">Abertos</TabsTrigger>
            <TabsTrigger value="preparing">Em Preparo</TabsTrigger>
            <TabsTrigger value="finished">Finalizados</TabsTrigger>
          </TabsList>
          <TabsContent
            value="all"
            className="md:max-h-[500px] max-h-[500px] overflow-y-auto scrollbar-hide"
          >
            <Card className="mb-4 bg-slate-900 text-white border-none">
              <CardHeader>
                <CardTitle>Pedido 89</CardTitle>
                <CardDescription>Rua Rio Solimões, 410</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 flex items-center gap-2">
                <span>Victor Alef</span>
                <span className="p-1 rounded-md border-2 text-[8px] text-white font-medium">
                  Aberto
                </span>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Button className="bg-foreground p-2 rounded-md border-2 border-red-600 text-xs text-white hover:bg-red-600">
                  Recusar
                </Button>
                <Button className="bg-foreground p-2 rounded-md border-2 border-green-600 text-xs text-white hover:bg-green-600">
                  Avançar
                </Button>
              </CardFooter>
            </Card>
            <Card className="mb-4 bg-slate-900 text-white border-none">
              <CardHeader>
                <CardTitle>Pedido 90</CardTitle>
                <CardDescription>Rua Capim Grosso</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <span>João Batista</span>
              </CardContent>
              <CardFooter>
                <span className="bg-transparent p-2 rounded-md border-2 text-xs select-none font-medium text-white">
                  Finalizado
                </span>
              </CardFooter>
            </Card>
            <Card className="mb-4 bg-slate-900 text-white border-none">
              <CardHeader>
                <CardTitle>Pedido 90</CardTitle>
                <CardDescription>Rua Capim Grosso</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <span>João Batista</span>
              </CardContent>
              <CardFooter>
                <span className="bg-transparent p-2 rounded-md border-2 text-xs select-none font-medium text-white">
                  Finalizado
                </span>
              </CardFooter>
            </Card>
            <Card className="mb-4 bg-slate-900 text-white border-none">
              <CardHeader>
                <CardTitle>Pedido 90</CardTitle>
                <CardDescription>Rua Capim Grosso</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <span>João Batista</span>
              </CardContent>
              <CardFooter>
                <span className="bg-transparent p-2 rounded-md border-2 text-xs select-none font-medium text-white">
                  Finalizado
                </span>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent
            value="open"
            className="md:max-h-[500px] max-h-[500px] overflow-y-auto scrollbar-hide"
          >
            <Card className="mb-4 bg-slate-900 text-white border-none">
              <CardHeader>
                <CardTitle>Pedido 89</CardTitle>
                <CardDescription>Rua Rio Solimões, 410</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 flex items-center gap-2">
                <span>Victor Alef</span>
                <span className="p-1 rounded-md border-2 text-[8px] text-white font-medium">
                  Aberto
                </span>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Button className="bg-foreground p-2 rounded-md border-2 border-red-600 text-xs text-white hover:bg-red-600">
                  Recusar
                </Button>
                <Button className="bg-foreground p-2 rounded-md border-2 border-green-600 text-xs text-white hover:bg-green-600">
                  Avançar
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent
            value="preparing"
            className="md:max-h-[500px] max-h-[500px] overflow-y-auto scrollbar-hide"
          >
            <Card className="mb-4 bg-slate-900 text-white border-none">
              <CardHeader>
                <CardTitle>Pedido 92</CardTitle>
                <CardDescription>Pedido para Rua Rio Amazonas</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 flex items-center gap-2">
                <span>Rui Ramos</span>
                <span className="p-1 rounded-md border-2 border-yellow-600 text-[8px] text-yellow-600 font-medium">
                  Em Preparo
                </span>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Button className="bg-foreground p-2 rounded-md border-2 border-red-600 text-xs text-white hover:bg-red-600">
                  Cancelar
                </Button>
                <Button className="bg-foreground p-2 rounded-md border-2 border-green-600 text-xs text-white hover:bg-green-600">
                  Avançar
                </Button>
              </CardFooter>
            </Card>
            <Card className="mb-4 bg-slate-900 text-white border-none">
              <CardHeader>
                <CardTitle>Pedido 93</CardTitle>
                <CardDescription>
                  Pedido para Joaquim Borba Filho
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 flex items-center gap-2">
                <span>Daniel Luka</span>
                <span className="p-1 rounded-md border-2 border-yellow-600 text-[8px] text-yellow-600 font-medium">
                  Em Preparo
                </span>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Button className="bg-foreground p-2 rounded-md border-2 border-red-600 text-xs text-white hover:bg-red-600">
                  Cancelar
                </Button>
                <Button className="bg-foreground p-2 rounded-md border-2 border-green-600 text-xs text-white hover:bg-green-600">
                  Avançar
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent
            value="finished"
            className="md:max-h-[500px] max-h-[500px] overflow-y-auto scrollbar-hide"
          >
            <Card className="mb-4 bg-slate-900 text-white border-none">
              <CardHeader>
                <CardTitle>Pedido 90</CardTitle>
                <CardDescription>Rua Capim Grosso</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <span>João Batista</span>
              </CardContent>
              <CardFooter>
                <span className="bg-transparent p-2 rounded-md border-2 text-xs select-none font-medium text-white">
                  Finalizado
                </span>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </section>
    </>
  );
}
