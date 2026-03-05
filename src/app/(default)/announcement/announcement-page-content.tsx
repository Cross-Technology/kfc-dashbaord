"use client"

import { DataTable } from "@/components/table/data-table"
import { Button } from "@/components/ui/button"
import { Megaphone, Plus } from "lucide-react"
import { useAnnouncementColumns } from "./columns"
import { announcementDatas } from "./data"

const AnnouncementPageContent = () => {
    const columns = useAnnouncementColumns()
    return (
        <section className="@container/main flex flex-1 flex-col gap-5">
            <div className="flex items-center justify-between gap-5">
                <div className="min-w-80">
                    <h1 className="text-md lg:text-lg font-semibold tracking-tight">
                        Announcements
                    </h1>
                    <p className="text-sm">Broadcast messages to customers or team members</p>
                </div>
                <Button>
                    <Plus />
                    New Announcement
                </Button>
            </div>
            <DataTable
                columns={columns}
                data={announcementDatas}
                pageCount={1}
                searchKey="title"
            />
        </section>
    )
}

export default AnnouncementPageContent
