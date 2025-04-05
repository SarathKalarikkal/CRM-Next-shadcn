"use client";

import { TrendingUp } from "lucide-react";
import { Pie, PieChart, Cell, Tooltip, YAxis, ResponsiveContainer } from "recharts";
import { dashboardData } from "@/constants/dashboardData";
import { Bar, BarChart, CartesianGrid, XAxis, Line, LineChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const COLORS = ["#6366F1", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#3B82F6"];

const ChartData = () => {
  const content = dashboardData;

  // ✅ FIXED: Chart data mapping with individual value for each label
  const chartData = content.leadChart.labels.map((label: string, index: number) => ({
    name: label,
    value: content.leadChart.data[index],
  }));


  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "hsl(var(--chart-1))",
    },
    mobile: {
      label: "Mobile",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig

  return (
   <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-5">
     <Card className="flex flex-col border-none rounded-2xl ">
      <CardHeader className="items-center pb-0">
        <CardTitle className="text-lg md:text-xl">Leads by Channel</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          January – June 2025
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1 flex justify-center">
        <PieChart width={250} height={250}>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={80}
            paddingAngle={4}
            dataKey="value"
            nameKey="name"
            label
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </CardContent>

      <CardFooter className="flex flex-col gap-1 text-sm px-6 pb-4">
        <div className="flex items-center gap-2 font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4 text-green-500" />
        </div>
        <div className="text-muted-foreground">
          Showing total leads from each channel
        </div>
      </CardFooter>
    </Card>
     <Card className="flex flex-col border-none rounded-2xl ">
      <CardHeader className="items-center pb-0">
        <CardTitle className="text-lg md:text-xl">Deals by Pipeline</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          January – June 2025
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1 flex justify-center p-4">
      <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={content.dealPipeline}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="stage"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="count" fill="#6366F1" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>

      <CardFooter className="flex flex-col gap-1 text-sm px-6 pb-4">
        <div className="flex items-center gap-2 font-medium">
          Trending up by 7.2% this month <TrendingUp className="h-4 w-4 text-green-500" />
        </div>
        <div className="text-muted-foreground">
          Showing total deals from each pipeline
        </div>
      </CardFooter>
    </Card>
    <Card className="flex flex-col border-none rounded-2xl ">
      <CardHeader className="items-center pb-0">
        <CardTitle className="text-lg md:text-xl">Monthly Progress</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          January – June 2025
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1 flex justify-center ">
        <ResponsiveContainer width="100%" height={250}>
          <LineChart
            data={content.monthlyProgress}
            margin={{ top: 24, left: 24, right: 24 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                borderRadius: "8px",
                border: "1px solid #e5e7eb",
              }}
            />
            <Line
              type="monotone"
              dataKey="leads"
              stroke="#6366F1" // Violet-500 from Tailwind
              strokeWidth={3}
              activeDot={{ r: 6 }}
              dot={{ r: 4, fill: "#6366F1" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>

      <CardFooter className="flex flex-col gap-1 text-sm px-6 pb-4">
        <div className="flex items-center gap-2 font-medium">
          Trending up by 6.4% this month{" "}
          <TrendingUp className="h-4 w-4 text-green-500" />
        </div>
        <div className="text-muted-foreground">
          Showing monthly progress of leads
        </div>
      </CardFooter>
    </Card>
   </div>
  );
};

export default ChartData;
