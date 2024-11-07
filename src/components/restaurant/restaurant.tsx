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
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "@radix-ui/react-dialog";
import {
  AlarmClock,
  CircleCheckBig,
  CircleX,
  LoaderCircle,
  MailMinus,
  MapPinHouse,
  Smartphone,
  UserRound,
} from "lucide-react";
import { useEffect, useState } from "react";
import { DialogFooter, DialogHeader } from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { toast } from "sonner";

import { useNavigate } from "react-router-dom";

export function Restaurant() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
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

  useEffect(() => {
    const fetchRestaurante = async () => {
      try {
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
      } catch (error) {
        toast.error("erro ao tentar buscar dados do restaurante");
      }
    };

    const fetchHorarios = async () => {
      try {
        const response = await api.get("/horario", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.data.isSucces) {
          toast.error("erro ao tentar buscar dados do restaurante");
          return;
        }

        setHorarios(response.data.data);
      } catch (erro) {
        toast.error("erro ao tentar buscar dados do restaurante");
      }
    };

    fetchHorarios();
    fetchRestaurante();
  }, []);

  const fecharAbrirRestaurante = async (horario: horario) => {
    try {
      const horarioAtualizado = {
        horaAbertura: horario.horaAbertura,
        horaFechamento: horario.horaFechamento,
        diaSemana: horario.diaSemana,
        funcionando: horario.funcionando ? false : true,
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
        toast.error(response.data.message);
      }
      setHorarios(
        horarios.map((h) =>
          h.diaSemana === horario.diaSemana ? horarioAtualizado : h
        )
      );

      console.log(horarios);

      toast.success(response.data.message);
    } catch (error: any) {
      console.log(error.status);
      if (error.status == 401) {
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        toast.error("erro ao tentar atualizar funcionamento do restaurante");
      }
    }
  };

  const atualizarFuncionamento = async (horario: horario) => {
    try {
      setIsAdding(true);

      const horarioAtualizado = {
        diaSemana: horario.diaSemana,
        horaAbertura: horarioAbertura ? horarioAbertura : horario.horaAbertura,
        horaFechamento: horarioFechamento
          ? horarioFechamento
          : horario.horaFechamento,
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
        toast.error("error", { className: "bg-red-200" });
        return;
      }

      setHorarios(
        horarios.map((h) =>
          h.diaSemana === horario.diaSemana ? horarioAtualizado : h
        )
      );

      toast.success("dados do restaurante atualizado", {
        className: "bg-green-200",
      });
    } catch (error: any) {
      console.log(error.status);
      if (error.status == 401) {
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        toast.error("erro ao tentar atualizar funcionamento do restaurante");
      }
    } finally {
      setIsAdding(false);
    }
  };

  const atualizarRestaurante = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAdding(true);

    try {
      const updateRestaurante = {
        nome: nome ? nome : restauranteInfo?.nome,
        telefone: telefone ? telefone : restauranteInfo?.telefone,
        endereco: endereco ? endereco : restauranteInfo?.endereco,
        email: email ? email : restauranteInfo?.email,
      } as restaurante;

      const response = await api.put("/restaurante", updateRestaurante, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.data.isSucces) {
        toast.error("erro ao tentar atualizar dados do restaurante");
      }

      setRestaurante(updateRestaurante);
    } catch (error: any) {
      console.log(error.status);
      if (error.status == 401) {
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        toast.error("erro ao tentar atualizar dados do restaurante");
      }
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-10 items-center h-full p-1 bg-slate-950 pt-10">
        <Card className="w-3/4 h-3/6 flex flex-col py-5 items-center bg-slate-900 border-none text-white">
          <CardHeader>
            <CardTitle className="text-center">
              Informações do Restaurante
            </CardTitle>
            <CardDescription className="font-medium">
              Adicione e altere suas configurações aqui.
            </CardDescription>
          </CardHeader>
          <CardContent className="w-full flex justify-center">
            <div className="flex items-center">
              <div className="w-full flex flex-col gap-8">
                <div className="flex gap-1">
                  <UserRound />
                  <span className="font-semibold">
                    Nome: {restauranteInfo?.nome}
                  </span>
                </div>

                <div className="flex gap-1">
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
              <Button className="bg-slate-50 text-black hover:bg-slate-950 hover:text-white">Editar</Button>
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
                      defaultValue={restauranteInfo?.nome}
                      onChange={(e) => setNome(e.target.value)}
                      className="col-span-3 border-2"
                    />
                  </div>

                  <div className="flex flex-col items-start text-right gap-3">
                    <Label htmlFor="closing-time">Telefone</Label>
                    <Input
                      id="closing-time"
                      defaultValue={restauranteInfo?.telefone}
                      onChange={(e) => setTelefone(e.target.value)}
                      className="col-span-3 border-2"
                    />
                  </div>
                  <div className="flex flex-col items-start text-right gap-3">
                    <Label htmlFor="closing-time">Endereco</Label>
                    <Input
                      id="closing-time"
                      defaultValue={restauranteInfo?.endereco}
                      onChange={(e) => setEndereco(e.target.value)}
                      className="col-span-3 border-2"
                    />
                  </div>
                  <div className="flex flex-col items-start text-right gap-3">
                    <Label htmlFor="closing-time">Email</Label>
                    <Input
                      id="closing-time"
                      defaultValue={restauranteInfo?.email}
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
                  <div className="flex gap-1 items-center">
                    <AlarmClock  size={15}/>
                    <span className="font-semibold">
                      Horario Abertura: {horario.horaAbertura.substring(0, 5)}
                    </span>
                  </div>

                  <div className="flex gap-1 items-center">
                    <AlarmClock size={15} />
                    <span className="font-semibold">
                      Horario de fechamento:{" "}
                      {horario.horaFechamento.substring(0, 5)}
                    </span>
                  </div>

                  {horario.funcionando ? (
                    <div className="flex gap-1 items-center">
                      <CircleCheckBig className="text-green-600" size={15} />
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
                        ? "text-white border-none"
                        : "text-green-600 border-green-600"
                    } bg-slate-950`}
                  >
                    {horario.funcionando ? "Fechar" : "Abrir"}
                  </Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="bg-slate-50 text-black hover:bg-slate-950 hover:text-white">Editar</Button>
                    </DialogTrigger>

                    <DialogPortal>
                      <DialogOverlay className="fixed inset-0 bg-black bg-opacity-50 z-1000" />
                      <DialogContent className="fixed bg-slate-900 border-none text-white z-1000 p-6 rounded-lg shadow-lg top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <DialogHeader>
                          <DialogTitle>
                            {getWeekDayName(horario.diaSemana)}
                          </DialogTitle>
                        </DialogHeader>
                        <form className="space-y-6 mt-4 ">
                          <div className="flex flex-col items-start text-right gap-3">
                            <Label htmlFor="name">Horario abertura</Label>
                            <Input
                              id="name"
                              defaultValue={horario.horaAbertura}
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
                              defaultValue={horario.horaFechamento}
                              onChange={(e) =>
                                setHorarioFechamento(e.target.value)
                              }
                              className="col-span-3 border-2"
                            />
                          </div>
                        </form>
                        <DialogFooter className="mt-3 w-auto sm:justify-center">
                          <DialogClose asChild>
                            <Button variant="destructive">Cancelar</Button>
                          </DialogClose>
                          <Button
                            variant="outline"
                            className="text-slate-950"
                            onClick={() => atualizarFuncionamento(horario)}
                          >
                            {isAdding ? (
                              <LoaderCircle className="animate-spin" />
                            ) : (
                              "Salvar"
                            )}
                          </Button>
                        </DialogFooter>
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
