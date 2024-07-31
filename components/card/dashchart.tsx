"use client"

import { TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, Line, LineChart, XAxis } from "recharts"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent, } from "@/components/ui/chart"
import { chartConfig, chartData } from "@/lib/chartdata"


const DashChart = () => {
    return (
        <Card className="bg-transparent mt-4 px-0">
            <CardHeader>
                <CardTitle>Area Chart - Gradient</CardTitle>
                <CardDescription>
                    Showing total visitors for the last 6 months
                </CardDescription>
            </CardHeader>
            <CardContent className="relative h-80 w-full px-0">
                <ChartContainer config={chartConfig} className="relative h-full w-full">
                    <LineChart accessibilityLayer data={chartData} margin={{ left: 12, right: 12, }} >
                        <CartesianGrid vertical={false} />
                        <XAxis dataKey="month" tickLine={true} axisLine={false} tickMargin={8} tickFormatter={(value) => value.slice(0, 3)} />
                        <ChartTooltip cursor={true} content={<ChartTooltipContent />} />
                        <Line dataKey="desktop" type="monotone" stroke="var(--color-desktop)" strokeWidth={2} dot={false} />
                        <Line dataKey="mobile" type="monotone" stroke="var(--color-mobile)" strokeWidth={2}dot={false} />
                    </LineChart>
                </ChartContainer>

            </CardContent>
            <CardFooter>
                <div className="flex w-full items-start gap-2 text-sm">
                    <div className="grid gap-2">
                        <div className="flex items-center gap-2 font-medium leading-none">
                            Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                        </div>
                        <div className="flex items-center gap-2 leading-none text-muted-foreground">
                            January - June 2024
                        </div>
                    </div>
                </div>
            </CardFooter>
        </Card>
    )
}

export default DashChart
