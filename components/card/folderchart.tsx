"use client"

import { Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent, } from "@/components/ui/chart"
import { chartConfig, chartData } from "@/lib/chartdata"

const FolderChart = () => {
    return (
        <ChartContainer config={chartConfig} className="w-full">
            <AreaChart accessibilityLayer data={chartData}>
                <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                />
                <Area
                    dataKey="desktop"
                    type="step"
                    fill="var(--color-desktop)"
                    fillOpacity={0.4}
                    stroke="var(--color-desktop)"
                />
            </AreaChart>
        </ChartContainer>
    )
}

export default FolderChart