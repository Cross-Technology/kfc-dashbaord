"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import { useIsMobile } from "@/hooks/use-mobile"
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from "@/components/ui/chart"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    ToggleGroup,
    ToggleGroupItem,
} from "@/components/ui/toggle-group"

export const description = "An interactive area chart"

const chartData = [
    { date: "2024-04-01", online: 222, inStore: 150 },
    { date: "2024-04-02", online: 97, inStore: 180 },
    { date: "2024-04-03", online: 167, inStore: 120 },
    { date: "2024-04-04", online: 242, inStore: 260 },
    { date: "2024-04-05", online: 373, inStore: 290 },
    { date: "2024-04-06", online: 301, inStore: 340 },
    { date: "2024-04-07", online: 245, inStore: 180 },
    { date: "2024-04-08", online: 409, inStore: 320 },
    { date: "2024-04-09", online: 59, inStore: 110 },
    { date: "2024-04-10", online: 261, inStore: 190 },
    { date: "2024-04-11", online: 327, inStore: 350 },
    { date: "2024-04-12", online: 292, inStore: 210 },
    { date: "2024-04-13", online: 342, inStore: 380 },
    { date: "2024-04-14", online: 137, inStore: 220 },
    { date: "2024-04-15", online: 120, inStore: 170 },
    { date: "2024-04-16", online: 138, inStore: 190 },
    { date: "2024-04-17", online: 446, inStore: 360 },
    { date: "2024-04-18", online: 364, inStore: 410 },
    { date: "2024-04-19", online: 243, inStore: 180 },
    { date: "2024-04-20", online: 89, inStore: 150 },
    { date: "2024-04-21", online: 137, inStore: 200 },
    { date: "2024-04-22", online: 224, inStore: 170 },
    { date: "2024-04-23", online: 138, inStore: 230 },
    { date: "2024-04-24", online: 387, inStore: 290 },
    { date: "2024-04-25", online: 215, inStore: 250 },
    { date: "2024-04-26", online: 75, inStore: 130 },
    { date: "2024-04-27", online: 383, inStore: 420 },
    { date: "2024-04-28", online: 122, inStore: 180 },
    { date: "2024-04-29", online: 315, inStore: 240 },
    { date: "2024-04-30", online: 454, inStore: 380 },
    { date: "2024-05-01", online: 165, inStore: 220 },
    { date: "2024-05-02", online: 293, inStore: 310 },
    { date: "2024-05-03", online: 247, inStore: 190 },
    { date: "2024-05-04", online: 385, inStore: 420 },
    { date: "2024-05-05", online: 481, inStore: 390 },
    { date: "2024-05-06", online: 498, inStore: 520 },
    { date: "2024-05-07", online: 388, inStore: 300 },
    { date: "2024-05-08", online: 149, inStore: 210 },
    { date: "2024-05-09", online: 227, inStore: 180 },
    { date: "2024-05-10", online: 293, inStore: 330 },
    { date: "2024-05-11", online: 335, inStore: 270 },
    { date: "2024-05-12", online: 197, inStore: 240 },
    { date: "2024-05-13", online: 197, inStore: 160 },
    { date: "2024-05-14", online: 448, inStore: 490 },
    { date: "2024-05-15", online: 473, inStore: 380 },
    { date: "2024-05-16", online: 338, inStore: 400 },
    { date: "2024-05-17", online: 499, inStore: 420 },
    { date: "2024-05-18", online: 315, inStore: 350 },
    { date: "2024-05-19", online: 235, inStore: 180 },
    { date: "2024-05-20", online: 177, inStore: 230 },
    { date: "2024-05-21", online: 82, inStore: 140 },
    { date: "2024-05-22", online: 81, inStore: 120 },
    { date: "2024-05-23", online: 252, inStore: 290 },
    { date: "2024-05-24", online: 294, inStore: 220 },
    { date: "2024-05-25", online: 201, inStore: 250 },
    { date: "2024-05-26", online: 213, inStore: 170 },
    { date: "2024-05-27", online: 420, inStore: 460 },
    { date: "2024-05-28", online: 233, inStore: 190 },
    { date: "2024-05-29", online: 78, inStore: 130 },
    { date: "2024-05-30", online: 340, inStore: 280 },
    { date: "2024-05-31", online: 178, inStore: 230 },
    { date: "2024-06-01", online: 178, inStore: 200 },
    { date: "2024-06-02", online: 470, inStore: 410 },
    { date: "2024-06-03", online: 103, inStore: 160 },
    { date: "2024-06-04", online: 439, inStore: 380 },
    { date: "2024-06-05", online: 88, inStore: 140 },
    { date: "2024-06-06", online: 294, inStore: 250 },
    { date: "2024-06-07", online: 323, inStore: 370 },
    { date: "2024-06-08", online: 385, inStore: 320 },
    { date: "2024-06-09", online: 438, inStore: 480 },
    { date: "2024-06-10", online: 155, inStore: 200 },
    { date: "2024-06-11", online: 92, inStore: 150 },
    { date: "2024-06-12", online: 492, inStore: 420 },
    { date: "2024-06-13", online: 81, inStore: 130 },
    { date: "2024-06-14", online: 426, inStore: 380 },
    { date: "2024-06-15", online: 307, inStore: 350 },
    { date: "2024-06-16", online: 371, inStore: 310 },
    { date: "2024-06-17", online: 475, inStore: 520 },
    { date: "2024-06-18", online: 107, inStore: 170 },
    { date: "2024-06-19", online: 341, inStore: 290 },
    { date: "2024-06-20", online: 408, inStore: 450 },
    { date: "2024-06-21", online: 169, inStore: 210 },
    { date: "2024-06-22", online: 317, inStore: 270 },
    { date: "2024-06-23", online: 480, inStore: 530 },
    { date: "2024-06-24", online: 132, inStore: 180 },
    { date: "2024-06-25", online: 141, inStore: 190 },
    { date: "2024-06-26", online: 434, inStore: 380 },
    { date: "2024-06-27", online: 448, inStore: 490 },
    { date: "2024-06-28", online: 149, inStore: 200 },
    { date: "2024-06-29", online: 103, inStore: 160 },
    { date: "2024-06-30", online: 446, inStore: 400 },
]

const chartConfig = {
    sales: {
        label: "Sales",
    },
    online: {
        label: "Online Sales",
        color: "var(--chart-1)",
    },
    inStore: {
        label: "In-Store Sales",
        color: "var(--chart-2)",
    },
} satisfies ChartConfig

export function Overview() {
    const isMobile = useIsMobile()
    const [timeRange, setTimeRange] = React.useState("90d")

    React.useEffect(() => {
        if (isMobile) {
            setTimeRange("7d")
        }
    }, [isMobile])

    const filteredData = chartData.filter((item) => {
        const date = new Date(item.date)
        const referenceDate = new Date("2024-06-30")
        let daysToSubtract = 90
        if (timeRange === "30d") {
            daysToSubtract = 30
        } else if (timeRange === "7d") {
            daysToSubtract = 7
        }
        const startDate = new Date(referenceDate)
        startDate.setDate(startDate.getDate() - daysToSubtract)
        return date >= startDate
    })

    return (
        <div className="col-span-full lg:col-span-4">
            <Card className="@container/card shadow-none">
                <CardHeader>
                    <CardTitle>Overview</CardTitle>
                    <CardDescription>
                        <span className="hidden @[540px]/card:block">
                            Total for the last 3 months
                        </span>
                        <span className="@[540px]/card:hidden">Last 3 months</span>
                    </CardDescription>
                    <CardAction>
                        <ToggleGroup
                            type="single"
                            value={timeRange}
                            onValueChange={setTimeRange}
                            variant="outline"
                            className="hidden *:data-[slot=toggle-group-item]:!px-4 @[767px]/card:flex"
                        >
                            <ToggleGroupItem value="90d">Last 3 months</ToggleGroupItem>
                            <ToggleGroupItem value="30d">Last 30 days</ToggleGroupItem>
                            <ToggleGroupItem value="7d">Last 7 days</ToggleGroupItem>
                        </ToggleGroup>
                        <Select value={timeRange} onValueChange={setTimeRange}>
                            <SelectTrigger
                                className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
                                size="sm"
                                aria-label="Select a value"
                            >
                                <SelectValue placeholder="Last 3 months" />
                            </SelectTrigger>
                            <SelectContent className="rounded-xl">
                                <SelectItem value="90d" className="rounded-lg">
                                    Last 3 months
                                </SelectItem>
                                <SelectItem value="30d" className="rounded-lg">
                                    Last 30 days
                                </SelectItem>
                                <SelectItem value="7d" className="rounded-lg">
                                    Last 7 days
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </CardAction>
                </CardHeader>
                <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
                    <ChartContainer
                        config={chartConfig}
                        className="aspect-auto h-[350px] w-full"
                    >
                        <AreaChart data={filteredData}>
                            <defs>
                                <linearGradient id="fillOnline" x1="0" y1="0" x2="0" y2="1">
                                    <stop
                                        offset="5%"
                                        stopColor="var(--color-online)"
                                        stopOpacity={1.0}
                                    />
                                    <stop
                                        offset="95%"
                                        stopColor="var(--color-online)"
                                        stopOpacity={0.1}
                                    />
                                </linearGradient>
                                <linearGradient id="fillInStore" x1="0" y1="0" x2="0" y2="1">
                                    <stop
                                        offset="5%"
                                        stopColor="var(--color-inStore)"
                                        stopOpacity={0.8}
                                    />
                                    <stop
                                        offset="95%"
                                        stopColor="var(--color-inStore)"
                                        stopOpacity={0.1}
                                    />
                                </linearGradient>
                            </defs>
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="date"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                minTickGap={32}
                                tickFormatter={(value) => {
                                    const date = new Date(value)
                                    return date.toLocaleDateString("en-US", {
                                        month: "short",
                                        day: "numeric",
                                    })
                                }}
                            />
                            <ChartTooltip
                                cursor={false}
                                content={
                                    <ChartTooltipContent
                                        labelFormatter={(value) => {
                                            return new Date(value).toLocaleDateString("en-US", {
                                                month: "short",
                                                day: "numeric",
                                            })
                                        }}
                                        indicator="dot"
                                    />
                                }
                            />
                            <Area
                                dataKey="inStore"
                                type="natural"
                                fill="url(#fillInStore)"
                                stroke="var(--color-inStore)"
                                stackId="a"
                            />
                            <Area
                                dataKey="online"
                                type="natural"
                                fill="url(#fillOnline)"
                                stroke="var(--color-online)"
                                stackId="a"
                            />
                        </AreaChart>
                    </ChartContainer>
                </CardContent>
            </Card>
        </div>
    )
}
