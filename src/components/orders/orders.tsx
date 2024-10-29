import { Badge } from "../ui/badge";
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
              <CardContent className="flex items-center gap-2">
                <span>Victor Alef</span>
                <Badge className="text-[8px] bg-blue-700 text-white hover:bg-blue-700 select-none">
                  Aberto
                </Badge>
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
                <Badge className="bg-white text-black hover:bg-white select-none">
                  Finalizado
                </Badge>
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
                <Badge className="bg-white text-black hover:bg-white select-none">
                  Finalizado
                </Badge>
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
                <Badge className="bg-white text-black hover:bg-white select-none">
                  Finalizado
                </Badge>
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
              <CardContent className="flex items-center gap-2">
                <span>Victor Alef</span>
                <Badge className="text-[8px] bg-blue-700 text-white hover:bg-blue-700 select-none">
                  Aberto
                </Badge>
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
              <CardContent className="flex items-center gap-2">
                <span>Rui Ramos</span>
                <Badge className="text-[8px] bg-yellow-600 text-white hover:bg-yellow-600 select-none">
                  Em Preparo
                </Badge>
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
              <CardContent className="flex items-center gap-2">
                <span>Daniel Luka</span>
                <Badge className="text-[8px] bg-yellow-600 text-white hover:bg-yellow-600 select-none">
                  Em Preparo
                </Badge>
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
                <Badge className="bg-white text-black hover:bg-white select-none">
                  Finalizado
                </Badge>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </section>
    </>
  );
}
