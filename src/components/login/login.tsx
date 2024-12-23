import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/lib/axios";
import { LoaderCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogin = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post("/auth", {
        email,
        password,
      });

      if (response.status == 200) {
        const data = response.data.data;
        localStorage.setItem("token", data);
        navigate("/");
      } else {
        toast.error("Credênciais inválidas.", {
          className:
            "bg-red-500 text-white font-semibold border-none shadow-lg",
          style: {
            borderRadius: "10px",
            padding: "16px",
          },
        });
        setLoading(false);
      }
    } catch (error) {
      toast.error("Ocorreu um erro ao tentar fazer login.", {
        className: "bg-red-500 text-white font-semibold border-none shadow-lg",
        style: {
          borderRadius: "10px",
          padding: "16px",
        },
      });

      setLoading(false);
    }
  };

  return (
    <section className="h-screen bg-slate-950 flex items-center justify-center">
      <Card className="w-[500px] bg-slate-900 border-none rounded-md text-white">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Entre com sua conta.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Digite seu email..."
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Digite sua senha..."
                />
              </div>
            </div>
            <Button
              type="submit"
              className="bg-white text-foreground hover:bg-slate-950 hover:text-white mt-4 w-full"
            >
              {loading ? <LoaderCircle className="animate-spin" /> : "Entrar"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}
