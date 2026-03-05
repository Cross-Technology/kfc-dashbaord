import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function RecentSales() {
    return (
        <div className="col-span-full lg:col-span-3">
            <Card className="@container/card shadow-none">
                <CardHeader>
                    <CardTitle>Recent Sales</CardTitle>
                    <CardDescription>
                        You made 265 sales this month.
                    </CardDescription>
                </CardHeader>
                <CardContent className="relative overflow-hidden h-[374px]">
                    <div className="space-y-5">
                        <div className="flex items-center">
                            <Avatar className="size-10">
                                <AvatarImage src="/avatars/01.png" alt="Avatar" />
                                <AvatarFallback>OM</AvatarFallback>
                            </Avatar>
                            <div className="ml-4">
                                <p className="text-sm font-medium leading-none">Olivia Martin</p>
                                <p className="text-sm text-muted-foreground">
                                    olivia.martin@email.com
                                </p>
                            </div>
                            <div className="ml-auto font-medium">+$1,999.00</div>
                        </div>
                        <div className="flex items-center">
                            <Avatar className="size-10">
                                <AvatarImage src="/avatars/02.png" alt="Avatar" />
                                <AvatarFallback>JL</AvatarFallback>
                            </Avatar>
                            <div className="ml-4">
                                <p className="text-sm font-medium leading-none">Jackson Lee</p>
                                <p className="text-sm text-muted-foreground">
                                    jackson.lee@email.com
                                </p>
                            </div>
                            <div className="ml-auto font-medium">+$39.00</div>
                        </div>
                        <div className="flex items-center">
                            <Avatar className="size-10">
                                <AvatarImage src="/avatars/03.png" alt="Avatar" />
                                <AvatarFallback>IN</AvatarFallback>
                            </Avatar>
                            <div className="ml-4">
                                <p className="text-sm font-medium leading-none">Isabella Nguyen</p>
                                <p className="text-sm text-muted-foreground">
                                    isabella.nguyen@email.com
                                </p>
                            </div>
                            <div className="ml-auto font-medium">+$299.00</div>
                        </div>
                        <div className="flex items-center">
                            <Avatar className="size-10">
                                <AvatarImage src="/avatars/04.png" alt="Avatar" />
                                <AvatarFallback>WK</AvatarFallback>
                            </Avatar>
                            <div className="ml-4">
                                <p className="text-sm font-medium leading-none">William Kim</p>
                                <p className="text-sm text-muted-foreground">
                                    will@email.com
                                </p>
                            </div>
                            <div className="ml-auto font-medium">+$99.00</div>
                        </div>
                        <div className="flex items-center">
                            <Avatar className="size-10">
                                <AvatarImage src="/avatars/05.png" alt="Avatar" />
                                <AvatarFallback>SD</AvatarFallback>
                            </Avatar>
                            <div className="ml-4">
                                <p className="text-sm font-medium leading-none">Sofia Davis</p>
                                <p className="text-sm text-muted-foreground">
                                    sofia.davis@email.com
                                </p>
                            </div>
                            <div className="ml-auto font-medium">+$39.00</div>
                        </div>
                        <div className="flex items-center">
                            <Avatar className="size-10">
                                <AvatarImage src="/avatars/05.png" alt="Avatar" />
                                <AvatarFallback>SD</AvatarFallback>
                            </Avatar>
                            <div className="ml-4">
                                <p className="text-sm font-medium leading-none">Sofia Davis</p>
                                <p className="text-sm text-muted-foreground">
                                    sofia.davis@email.com
                                </p>
                            </div>
                            <div className="ml-auto font-medium">+$39.00</div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
