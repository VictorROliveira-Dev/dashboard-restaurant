import { useLocation, useNavigate } from "react-router-dom";
import {
  Home,
  ShoppingBag,
  Package,
  ClipboardList,
  Cog,
  Info,
  LogOut,
  UtensilsCrossed,
  Text,
} from "lucide-react";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "../ui/tooltip"; // Substitua pelos seus imports corretos
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";

export function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Função para definir a classe de estilo ativo
  const isActive = (path: string) =>
    location.pathname === path ? "text-white" : "text-muted-foreground";

  return (
    <div className="flex w-full flex-col bg-muted/40">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 border-none bg-slate-900 sm:flex flex-col">
        <nav className="flex flex-col items-center gap-4 px-2 py-5">
          <TooltipProvider>
            <a
              href="#"
              className="flex h-9 w-9 shrink-0 items-center justify-center bg-white text-black rounded-full"
            >
              <UtensilsCrossed className="w-4 h-4" />
              <span className="sr-only">Dashboard ícone</span>
            </a>

            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  href="/"
                  className={`flex h-9 w-9 shrink-0 items-center justify-center transition-colors hover:text-white ${isActive(
                    "/"
                  )}`}
                >
                  <Home className="w-5 h-5" />
                  <span className="sr-only">Início</span>
                </a>
              </TooltipTrigger>
              <TooltipContent side="right" className="bg-slate-950">
                Início
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  href="/orders"
                  className={`flex h-9 w-9 shrink-0 items-center justify-center transition-colors hover:text-white ${isActive(
                    "/orders"
                  )}`}
                >
                  <ShoppingBag className="w-5 h-5" />
                  <span className="sr-only">Pedidos</span>
                </a>
              </TooltipTrigger>
              <TooltipContent side="right" className="bg-slate-950">
                Pedidos
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  href="/produto"
                  className={`flex h-9 w-9 shrink-0 items-center justify-center transition-colors hover:text-white ${isActive(
                    "/produto"
                  )}`}
                >
                  <Package className="w-5 h-5" />
                  <span className="sr-only">Produtos</span>
                </a>
              </TooltipTrigger>
              <TooltipContent side="right" className="bg-slate-950">
                Produtos
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  href="/categorias"
                  className={`flex h-9 w-9 shrink-0 items-center justify-center transition-colors hover:text-white ${isActive(
                    "/categories"
                  )}`}
                >
                  <ClipboardList className="w-5 h-5" />
                  <span className="sr-only">Categorias</span>
                </a>
              </TooltipTrigger>
              <TooltipContent side="right" className="bg-slate-950">
                Categorias
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  href="/restaurant"
                  className={`flex h-9 w-9 shrink-0 items-center justify-center transition-colors hover:text-white ${isActive(
                    "/settings"
                  )}`}
                >
                  <Cog className="w-5 h-5" />
                  <span className="sr-only">Configurações</span>
                </a>
              </TooltipTrigger>
              <TooltipContent side="right" className="bg-slate-950">
                Configurações
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  href="/settings"
                  className={`flex h-9 w-9 shrink-0 items-center justify-center transition-colors hover:text-white ${isActive(
                    "/settings"
                  )}`}
                >
                  <Cog className="w-5 h-5" />
                  <span className="sr-only">Configurações</span>
                </a>
              </TooltipTrigger>
              <TooltipContent side="right" className="bg-slate-950">
                Configurações
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>

        <nav className="mt-auto flex flex-col items-center gap-4 px-2 py-5">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  href="#"
                  className="flex h-9 w-9 shrink-0 items-center justify-center text-muted-foreground transition-colors hover:text-white"
                >
                  <Info className="w-5 h-5" />
                  <span className="sr-only">Informações</span>
                </a>
              </TooltipTrigger>
              <TooltipContent side="right" className="bg-slate-950">
                Informações
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={handleLogout}
                  className="bg-transparent shadow-none"
                >
                  <LogOut className="text-red-600" size={20} />
                  <span className="sr-only">Sair</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" className="bg-slate-950">
                Sair
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
      </aside>

      <div className="sm:hidden flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center px-4 border-none bg-slate-900 gap-4 sm:h-auto sm: border-0 sm:bg-transparent sm:px-6">
          <Sheet>
            <SheetTrigger asChild className="text-white">
              <Button size="icon" className="sm:hidden ">
                <Text className="w-6 h-6 text-white" />
                <span className="sr-only">Abrir ou Fechar Menu</span>
              </Button>
            </SheetTrigger>

            <SheetContent
              side="left"
              className="sm:max-w-x bg-slate-900 border-none"
            >
              <nav className="grid gap-6 text-lg font-semibold">
                <a
                  href="#"
                  className="flex h-10 w-10 bg-primary rounded-full bg-white text-lg items-center justify-center text-primary-foreground md:text-base gap-2"
                >
                  <UtensilsCrossed className="w-5 h-5 translate-all text-slate-950" />
                  <span className="sr-only">Logotipo do Restaurante</span>
                </a>

                <a
                  href="/"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-white"
                >
                  <Home className="w-5 h-5 translate-all" />
                  Início
                </a>

                <a
                  href="/orders"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-white"
                >
                  <ShoppingBag className="w-5 h-5 translate-all" />
                  Pedidos
                </a>

                <a
                  href="/produto"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-white"
                >
                  <Package className="w-5 h-5 translate-all" />
                  Produtos
                </a>

                <a
                  href="/categorias"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-white"
                >
                  <ClipboardList className="w-5 h-5" />
                  Categorias
                </a>

                <a
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-white"
                >
                  <Cog className="w-5 h-5 translate-all" />
                  Configurações
                </a>
                <a
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-white"
                >
                  <Info className="w-5 h-5 translate-all" />
                  Informações
                </a>
                <Button
                  onClick={handleLogout}
                  className="flex justify-start bg-transparent shadow-none gap-4 text-muted-foreground hover:text-white"
                >
                  <LogOut className="text-red-600" size={20} />
                  Sair
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </header>
      </div>
    </div>
  );
}
