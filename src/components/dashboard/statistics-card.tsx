import { Box, Handbag, TrendingDown, TrendingUp, Users, Wallet } from "lucide-react"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"


const StatisticsCard = () => {
    return (
        <div className="*:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-none lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
            <Card className="@container/card">
                <CardHeader>
                    <div className="flex items-center justify-center w-10 h-10 bg-muted rounded-md ">
                        <Wallet className="text-gray-800 size-5 dark:text-white/90" />
                    </div>
                </CardHeader>
                <CardFooter className="flex-col items-start gap-2 text-sm">
                    <CardDescription>Today&apos;s Revenue</CardDescription>
                    <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                        $24,560.00
                    </CardTitle>
                    <div className="line-clamp-1 flex mt-3 gap-2 font-medium">
                        <Badge variant="success">
                            <TrendingUp />
                            +18.2%
                        </Badge>
                        Over last week
                    </div>
                </CardFooter>
            </Card>
            <Card className="@container/card">
                <CardHeader>
                    <div className="flex items-center justify-center w-10 h-10 bg-muted rounded-md ">
                        <Handbag className="text-gray-800 size-5 dark:text-white/90" />
                    </div>
                </CardHeader>
                <CardFooter className="flex-col items-start gap-2 text-sm">
                    <CardDescription>Total Orders</CardDescription>
                    <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                        1,234
                    </CardTitle>
                    <div className="line-clamp-1 flex mt-3 gap-2 font-medium">
                        <Badge variant="danger">
                            <TrendingDown />
                            -3.4%
                        </Badge>
                        Over last week
                    </div>
                </CardFooter>
            </Card>

            <Card className="@container/card">
                <CardHeader>
                    <div className="flex items-center justify-center w-10 h-10 bg-muted rounded-md ">
                        <Users className="text-gray-800 size-5 dark:text-white/90" />
                    </div>
                </CardHeader>
                <CardFooter className="flex-col items-start gap-2 text-sm">
                    <CardDescription>Customers</CardDescription>
                    <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                        458+
                    </CardTitle>
                    <div className="line-clamp-1 flex mt-3 gap-2 font-medium">
                        <Badge variant="warning">
                            <TrendingUp />
                            +2.5%
                        </Badge>
                        Over last month
                    </div>
                </CardFooter>
            </Card>
            <Card className="@container/card">
                <CardHeader>
                    <div className="flex items-center justify-center w-10 h-10 bg-muted rounded-md ">
                        <Box className="text-gray-800 size-5 dark:text-white/90" />
                    </div>
                </CardHeader>
                <CardFooter className="flex-col items-start gap-2 text-sm">
                    <CardDescription>Total Menu</CardDescription>
                    <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                        50+
                    </CardTitle>
                    <div className="line-clamp-1 flex mt-3 gap-2 font-medium">
                        <Badge variant="success">
                            <TrendingUp />
                            +4.5%
                        </Badge>
                        Over last month
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}

export default StatisticsCard