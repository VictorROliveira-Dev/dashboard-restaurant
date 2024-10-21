import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { api } from "@/lib/axios";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "@radix-ui/react-dialog";
import {
  AlarmClock,
  Calendar,
  CircleCheckBig,
  CircleX,
  LoaderCircle,
  MailMinus,
  MapPinHouse,
  Pen,
  Plus,
  Smartphone,
  UserRound,
} from "lucide-react";
import { useEffect, useState } from "react";
import { DialogFooter, DialogHeader } from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

export function Restaurant() {
  const token = localStorage.getItem("token");

  interface restaurante {
    id: number;
    nome: string;
    endereco: string;
    telefone: string;
    email: string;
  }

  interface horario {
    diaSemana: number;
    horaAbertura: string;
    horaFechamento: string;
    funcionando: boolean;
    restauranteId: 1;
  }

  const [nome, setNome] = useState<string>("");
  const [horarioAbertura, setHorarioAbertura] = useState<string>("");
  const [horarioFechamento, setHorarioFechamento] = useState<string>("");
  const [telefone, setTelefone] = useState<string>("");
  const [endereco, setEndereco] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const [restauranteInfo, setRestaurante] = useState<restaurante | null>(null);
  const [horarios, setHorarios] = useState<horario[]>([]);
  const [isAdding, setIsAdding] = useState<boolean>(false);

  function getWeekDayName(dayNumber: number) {
    const weekDays = [
      "Domingo",
      "Segunda-feira",
      "Terça-feira",
      "Quarta-feira",
      "Quinta-feira",
      "Sexta-feira",
      "Sábado",
    ];
    return weekDays[dayNumber];
  }

  const fecharAbrirRestaurante = async (horario: horario) => {
    horario.funcionando
      ? (horario.funcionando = false)
      : (horario.funcionando = true);

    console.log(horario);
    const response = await api.put(`/horario/${horario.diaSemana}`, horario, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  const atualizarFuncionamento = async (
    e: React.FormEvent,
    horario: horario
  ) => {
    e.preventDefault();

    const horarioAtualizado = {
      diaSemana: horario.diaSemana,
      horaAbertura: horarioAbertura,
      horaFechamento: horarioFechamento,
      funcionando: horario.funcionando,
    } as horario;

    const response = await api.put(
      `/horario/${horario.diaSemana}`,
      horarioAtualizado,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.data.isSucces) {
      alert("error");
      return;
    }

    setHorarios(
      horarios.map((h) =>
        h.diaSemana === horario.diaSemana ? horarioAtualizado : h
      )
    );
  };

  const atualizarRestaurante = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAdding(true);

    try {
      const updateRestaurante = {
        nome: nome,
        telefone: telefone,
        endereco: endereco,
        email: email,
      } as restaurante;

      setRestaurante(updateRestaurante);

      const response = await api.put(`/restaurante`, updateRestaurante, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.data.isSucces) {
        alert("erro");
      }
    } catch (erro) {
    } finally {
      setIsAdding(false);
    }
  };

  useEffect(() => {
    const fetchRestaurante = async () => {
      const response = await api.get("/restaurante", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.data.isSucces) {
        alert("nao foi possivel recuperar dados");
        return;
      }

      setRestaurante(response.data.data);
    };

    const fetchHorarios = async () => {
      const token = localStorage.getItem("token");

      const response = await api.get("/horario", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.data.isSucces) {
        alert("nao foi possivel recuperar dados");
        return;
      }

      setHorarios(response.data.data);
    };

    fetchHorarios();
    fetchRestaurante();
  }, []);

  return (
    <>
      <div className="flex  flex-col gap-10 items-center h-full w-100 p-1 bg-slate-950 pt-10">
        <Card className="w-3/4 h-3/6 flex flex-col items-center bg-slate-900 border-none text-white">
          <CardHeader>
            <CardTitle>Informacoes do restaurante</CardTitle>
            <CardDescription>
              Deploy your new project in one-click.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between gap-10">
              <div className="w-full flex flex-col gap-8">
                <div className="flex gap-1">
                  <UserRound />
                  <span className="font-semibold">
                    Nome: {restauranteInfo?.nome}
                  </span>
                </div>

                <div className="flex gap-1 ">
                  <MailMinus />
                  <span className="font-semibold">
                    Email: {restauranteInfo?.email}
                  </span>
                </div>
              </div>
              <div className=" w-full flex flex-col gap-8">
                <div className="flex gap-1">
                  <Smartphone />
                  <span className="font-semibold">
                    Telefone: {restauranteInfo?.telefone}
                  </span>
                </div>
                <div className="flex gap-1">
                  <MapPinHouse />
                  <span className="font-semibold">
                    Endereco: {restauranteInfo?.endereco}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>

          <Dialog>
            <DialogTrigger asChild>
              <Button>Editar</Button>
            </DialogTrigger>

            <DialogPortal>
              <DialogOverlay className="fixed inset-0 bg-black bg-opacity-50 z-1000" />
              <DialogContent className="fixed bg-slate-900 border-none text-white z-1000 p-6 rounded-lg shadow-lg top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <DialogHeader>
                  <DialogTitle>Editar Restaurante</DialogTitle>
                </DialogHeader>

                <form
                  onSubmit={atualizarRestaurante}
                  className="space-y-6 mt-4 "
                >
                  <div className="flex flex-col items-start text-right gap-3">
                    <Label htmlFor="name">Nome</Label>
                    <Input
                      id="name"
                      onChange={(e) => setNome(e.target.value)}
                      className="col-span-3 border-2"
                    />
                  </div>

                  <div className="flex flex-col items-start text-right gap-3">
                    <Label htmlFor="closing-time">Telefone</Label>
                    <Input
                      id="closing-time"
                      onChange={(e) => setTelefone(e.target.value)}
                      className="col-span-3 border-2"
                    />
                  </div>
                  <div className="flex flex-col items-start text-right gap-3">
                    <Label htmlFor="closing-time">Endereco</Label>
                    <Input
                      id="closing-time"
                      onChange={(e) => setEndereco(e.target.value)}
                      className="col-span-3 border-2"
                    />
                  </div>
                  <div className="flex flex-col items-start text-right gap-3">
                    <Label htmlFor="closing-time">Email</Label>
                    <Input
                      id="closing-time"
                      onChange={(e) => setEmail(e.target.value)}
                      className="col-span-3 border-2"
                    />
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
                      {isAdding ? (
                        <LoaderCircle className="animate-spin" />
                      ) : (
                        "Salvar"
                      )}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </DialogPortal>
          </Dialog>
        </Card>

        <h1 className="text-white">Funcionamento</h1>

        <div className="grid grid-cols-3 gap-4">
          {horarios
            .sort((a, b) => a.diaSemana - b.diaSemana)
            .map((horario) => (
              <Card
                key={horario.diaSemana}
                className="max-width[350px] w-auto bg-slate-900 border-none text-white"
              >
                <CardHeader>
                  <CardTitle>{getWeekDayName(horario.diaSemana)}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-2">
                  <div className="flex gap-1">
                    <AlarmClock />
                    <span className="font-semibold">
                      Horario Abertura: {horario.horaAbertura.substring(0, 5)}
                    </span>
                  </div>

                  <div className="flex gap-1">
                    <AlarmClock />
                    <span className="font-semibold">
                      Horario de fechamento:{" "}
                      {horario.horaFechamento.substring(0, 5)}
                    </span>
                  </div>

                  {horario.funcionando ? (
                    <div className="flex gap-1">
                      <CircleCheckBig className="text-green-600" />
                      <span className="font-semibold text-green-600">
                        Funcionando
                      </span>
                    </div>
                  ) : (
                    <div className="flex gap-1">
                      <CircleX className="text-red-600" />
                      <span className="font-semibold text-red-600">
                        Fechado
                      </span>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button
                    onClick={() => fecharAbrirRestaurante(horario)}
                    variant="outline"
                    className={`${
                      horario.funcionando
                        ? "text-red-600 border-red-600"
                        : "text-green-600 border-green-600"
                    } bg-slate-950`}
                  >
                    {horario.funcionando ? "Fechar" : "Abrir"}
                  </Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>Editar</Button>
                    </DialogTrigger>

                    <DialogPortal>
                      <DialogOverlay className="fixed inset-0 bg-black bg-opacity-50 z-1000" />
                      <DialogContent className="fixed bg-slate-900 border-none text-white z-1000 p-6 rounded-lg shadow-lg top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <DialogHeader>
                          <DialogTitle>
                            {getWeekDayName(horario.diaSemana)}
                          </DialogTitle>
                        </DialogHeader>

                        <form
                          onSubmit={(e) => atualizarFuncionamento(e, horario)}
                          className="space-y-6 mt-4 "
                        >
                          <div className="flex flex-col items-start text-right gap-3">
                            <Label htmlFor="name">Horario abertura</Label>
                            <Input
                              id="name"
                              onChange={(e) =>
                                setHorarioAbertura(e.target.value)
                              }
                              className="col-span-3 border-2"
                            />
                          </div>

                          <div className="flex flex-col items-start text-right gap-3">
                            <Label htmlFor="closing-time">Hora de fechar</Label>
                            <Input
                              id="closing-time"
                              onChange={(e) =>
                                setHorarioFechamento(e.target.value)
                              }
                              className="col-span-3 border-2"
                            />
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
                              {isAdding ? (
                                <LoaderCircle className="animate-spin" />
                              ) : (
                                "Salvar"
                              )}
                            </Button>
                          </DialogFooter>
                        </form>
                      </DialogContent>
                    </DialogPortal>
                  </Dialog>
                </CardFooter>
              </Card>
            ))}
        </div>
      </div>
    </>
  );
}
