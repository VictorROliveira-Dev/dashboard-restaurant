import { ChartLine } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Bar, CartesianGrid, BarChart, XAxis } from "recharts";

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#1A3636",
  },
  mobile: {
    label: "Mobile",
    color: "#3C3D37",
  },
} satisfies ChartConfig;

export default function ChartOverview() {
  return (
    <Card className="w-full bg-slate-900 border-none">
      <CardHeader>
        <div className="flex items-center justify-center gap-4">
          <CardTitle className="text-lg sm:text-xl text-white">
            Overview de Vendas
          </CardTitle>
          <ChartLine className="w-6 h-6 text-white"/>
        </div>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
          <BarChart data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
            <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
