"use client"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent, } from "@/components/ui/chart"
import { chartConfig, chartData } from "@/lib/chartdata"

const WeeklyChart = () => {
    return (
        <ChartContainer config={chartConfig} className="w-full">
            <BarChart accessibilityLayer data={chartData}>
                <ChartTooltip cursor={true} content={<ChartTooltipContent indicator="dashed" />} />
                <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
                <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
            </BarChart>
        </ChartContainer>
    )
}

export default WeeklyChart