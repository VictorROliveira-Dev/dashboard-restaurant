import { useEffect, useState } from "react";
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
import { api } from "@/lib/axios";
import { toast } from "sonner";
import { Pedido } from "@/lib/types";
import { Badge } from "../ui/badge";
import * as signalR from "@microsoft/signalr";
import { History } from "lucide-react";

const Status = {
  Processando: 1,
  EmPreparo: 2,
  Entrega: 3,
  Finalizado: 4,
  Cancelado: 5,
};

export function Orders() {
  const token = localStorage.getItem("token");
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [pedidosAbertos, setPedidosAbertos] = useState<Pedido[]>([]);
  const [pedidosAndamento, setPedidosAndamento] = useState<Pedido[]>([]);
  const [pedidosEntrega, setPedidosEntrega] = useState<Pedido[]>([]);

  const fetchPedidos = async () => {
    const response = await api.get("/pedido/buscartodospedidos", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.data.isSucces) {
      toast.error("nao foi possivel buscar os pedidos recarregue a pagina");
    }

    setPedidos(response.data.data);
  };

  async function atualizarPedido(pedidoId: number, status: number) {
    const response = await api.put(
      `/pedido/${pedidoId}`,
      { statusAtualizado: status },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.data.isSucces) {
      toast.error("Nao foi possivel atualizar o pedido");
      return;
    }

    let pedido;
    switch (status) {
      case 2:
        pedido = pedidosAbertos.find((p) => p.id === pedidoId);
        if (pedido) {
          setPedidosAbertos((prev) => prev.filter((p) => p.id !== pedidoId));
          pedido.status = status;
          setPedidosAndamento((prev) => [...prev, pedido!]);
        }
        break;
      case 3:
        pedido = pedidosAndamento.find((p) => p.id === pedidoId);
        console.log(pedido);
        if (pedido) {
          setPedidosAndamento((prev) => prev.filter((p) => p.id !== pedidoId));
          pedido.status = status;
          setPedidosEntrega((prev) => [...prev, pedido!]);
        }
        break;
      case 5:
        pedido =
          pedidosAbertos.find((p) => p.id === pedidoId) ||
          pedidosAndamento.find((p) => p.id === pedidoId) ||
          pedidosEntrega.find((p) => p.id === pedidoId);

        if (pedido) {
          pedido.status = status;
          setPedidosAbertos((prev) => prev.filter((p) => p.id !== pedidoId));
          setPedidosAndamento((prev) => prev.filter((p) => p.id !== pedidoId));
          setPedidos((prev) => [...prev, pedido!]);
        }
        break;
    }

    toast.success("Pedido Atualizado Com Sucesso");
  }

  async function buscarPedidosAndamento(status: number) {
    const buscarPedidos = async () =>
      await api.get(`/pedido/buscarpedidosdia?status=${status}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

    switch (status) {
      case 1:
        if (pedidosAbertos.length <= 0) {
          const response = await buscarPedidos();
          setPedidosAbertos(response.data.data);
          console.log(pedidosAbertos);
        }

        break;
      case 2:
        if (pedidosAndamento.length <= 0) {
          const response = await buscarPedidos();
          setPedidosAndamento(response.data.data);
          console.log(pedidosAndamento);
        }
        break;
      case 3:
        if (pedidosEntrega.length <= 0) {
          const response = await buscarPedidos();
          setPedidosEntrega(response.data.data);
          console.log(pedidosEntrega);
        }
        break;
    }
  }

  useEffect(() => {
    let connection: signalR.HubConnection | null = null;

    const startConnection = async () => {
      if (!connection) {
        connection = new signalR.HubConnectionBuilder()
          .withUrl("https://bccardapiodigital.onrender.com/pedidohub", {
            skipNegotiation: true,
            transport: signalR.HttpTransportType.WebSockets,
          })
          .withAutomaticReconnect()
          .build();

        connection.on("ReceberNovoPedido", (pedido: Pedido) => {
          setPedidosAbertos((pedidosAnteriores) => [
            ...pedidosAnteriores,
            pedido,
          ]);
        });

        try {
          await connection.start();
          console.log("Conectado ao WebSocket");
        } catch (err) {
          console.error("Erro ao conectar ao WebSocket", err);
        }
      }
    };

    startConnection();

    fetchPedidos();
    buscarPedidosAndamento(1);

    buscarPedidosAndamento(2);

    buscarPedidosAndamento(3);

    return () => {
      if (connection) {
        connection.off("ReceberNovoPedido");
        connection.stop();
        console.log("Conexão encerrada");
      }
    };
  }, [token]);
  return (
    <>
      <section className="bg-slate-950 h-screen w-full flex  items-start  justify-center md:p-24">
        <Tabs defaultValue="abertos" className="md:w-[80%] w-[380px]">
          <TabsList className="grid w-full grid-cols-4 bg-slate-900 text-white">
            <TabsTrigger value="todos">Todos</TabsTrigger>
            <TabsTrigger value="abertos">Abertos</TabsTrigger>
            <TabsTrigger value="preparo">Em Preparo</TabsTrigger>
            <TabsTrigger value="entrega">Entrega</TabsTrigger>
          </TabsList>
          <TabsContent
            value="todos"
            className="md:max-h-[500px] md:grid md:grid-cols-2 md:gap-10 max-h-[500px] overflow-y-auto scrollbar-hide"
          >
            {pedidos.map((pedido) => (
              <Card
                key={pedido.id}
                className="mb-4 h-full bg-slate-900 text-white border-none"
              >
                <CardHeader>
                  <CardTitle>Pedido {pedido.id}</CardTitle>
                  <CardDescription>{pedido.endereco}</CardDescription>
                </CardHeader>
                <CardContent className="flex items-center gap-2">
                  <span>{pedido.nomeCliente}</span>
                  <Badge className="text-[8px] bg-blue-700 text-white hover:bg-blue-700 select-none">
                    Aberto
                  </Badge>
                </CardContent>
                <CardFooter className="flex gap-2">
                  {pedido.status === 5 ? (
                    <Badge className="bg-foreground p-2 rounded-md border-2 border-red-600 text-xs text-white hover:bg-red-600">
                      Cancelado
                    </Badge>
                  ) : (
                    <Badge className="bg-white text-black hover:bg-white select-none">
                      Finalizado
                    </Badge>
                  )}
                </CardFooter>
              </Card>
            ))}
          </TabsContent>

          <TabsContent
            value="abertos"
            className="md:max-h-[500px] max-h-[500px] md:grid md:grid-cols-2 md:gap-10 overflow-y-auto scrollbar-hide"
          >
            {pedidosAbertos.length > 0 ? (
              pedidosAbertos.map((pedido) => (
                <Card
                  key={pedido.id}
                  className="mb-4 h-full bg-slate-900 text-white border-none"
                >
                  <CardHeader>
                    <CardTitle>Pedido {pedido.id}</CardTitle>
                    <CardDescription>{pedido.endereco}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex items-center gap-2">
                    <span>{pedido.nomeCliente}</span>
                    <Badge className="text-[8px] bg-blue-700 text-white hover:bg-blue-700 select-none">
                      Aberto
                    </Badge>
                  </CardContent>
                  <CardFooter className="flex gap-2">
                    <Button
                      onClick={() =>
                        atualizarPedido(pedido.id, Status.Cancelado)
                      }
                      className="bg-foreground p-2 rounded-md border-2 border-red-600 text-xs text-white hover:bg-red-600"
                    >
                      Recusar
                    </Button>
                    <Button
                      onClick={() =>
                        atualizarPedido(pedido.id, Status.EmPreparo)
                      }
                      className="bg-foreground p-2 rounded-md border-2 border-green-600 text-xs text-white hover:bg-green-600"
                    >
                      Avançar
                    </Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="flex gap-3 text-white justify-center items-center mt-10">
                <History />
                <span>Nenhum pedido Pendente</span>
              </div>
            )}
          </TabsContent>

          <TabsContent
            value="preparo"
            className="md:max-h-[500px] max-h-[500px] md:grid md:grid-cols-2 md:gap-10 overflow-y-auto scrollbar-hide"
          >
            {pedidosAndamento.length > 0 ? (
              pedidosAndamento.map((pedido) => (
                <Card
                  key={pedido.id}
                  className="mb-4 h-full bg-slate-900 text-white border-none"
                >
                  <CardHeader>
                    <CardTitle>Pedido {pedido.id}</CardTitle>
                    <CardDescription>{pedido.endereco}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex items-center gap-2">
                    <span>{pedido.nomeCliente}</span>
                    <Badge className="text-[8px] bg-yellow-600 text-white hover:bg-yellow-600 select-none">
                      Em Preparo
                    </Badge>
                  </CardContent>
                  <CardFooter className="flex gap-2">
                    <Button
                      onClick={() =>
                        atualizarPedido(pedido.id, Status.Cancelado)
                      }
                      className="bg-foreground p-2 rounded-md border-2 border-red-600 text-xs text-white hover:bg-red-600"
                    >
                      Cancelar
                    </Button>
                    <Button
                      onClick={() => atualizarPedido(pedido.id, Status.Entrega)}
                      className="bg-foreground p-2 rounded-md border-2 border-green-600 text-xs text-white hover:bg-green-600"
                    >
                      Avançar
                    </Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="flex gap-3 text-white justify-center items-center mt-10">
                <History />
                <span>Nenhum pedido Em Andamento</span>
              </div>
            )}
          </TabsContent>

          <TabsContent
            value="entrega"
            className="md:max-h-[500px] max-h-[500px] md:grid md:grid-cols-2 md:gap-10 overflow-y-auto scrollbar-hide"
          >
            {pedidosEntrega.length > 0 ? (
              pedidosEntrega.map((pedido) => (
                <Card
                  key={pedido.id}
                  className="mb-4 h-full bg-slate-900 text-white border-none"
                >
                  <CardHeader>
                    <CardTitle>Pedido {pedido.id}</CardTitle>
                    <CardDescription>{pedido.endereco}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex items-center gap-2">
                    <span>{pedido.nomeCliente}</span>
                    <Badge className="bg-green-600 text-white hover:bg-green-600 select-none">
                      Saiu para entrega
                    </Badge>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="flex gap-3 text-white justify-center items-center mt-10">
                <History />
                <span>Nenhum pedido indo para entrega</span>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </section>
    </>
  );
}