"use client"

import * as React from "react"
import { CloudUpload } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"

export interface FileUploadProps extends React.InputHTMLAttributes<HTMLInputElement> { }

export const FileUpload = React.forwardRef<HTMLInputElement, FileUploadProps>(
    ({ className, onChange, ...props }, ref) => {
        const [previewUrl, setPreviewUrl] = React.useState<string | null>(null)

        const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0]
            if (file && file.type.startsWith('image/')) {
                const url = URL.createObjectURL(file)
                setPreviewUrl(url)
            } else {
                setPreviewUrl(null)
            }

            if (onChange) {
                onChange(e)
            }
        }

        // Cleanup the object URL when component unmounts or preview url changes
        React.useEffect(() => {
            return () => {
                if (previewUrl) URL.revokeObjectURL(previewUrl)
            }
        }, [previewUrl])

        return (
            <div
                className={cn(
                    "relative flex flex-col items-center justify-center w-full h-42 px-4 border-2 border-dashed rounded-lg cursor-pointer bg-transparent hover:bg-muted/50 border-input transition-colors overflow-hidden",
                    className
                )}
            >
                {previewUrl ? (
                    <div className="absolute inset-0 p-1.5 w-full h-full">
                        <Image
                            src={previewUrl}
                            alt="Upload preview"
                            width={300}
                            height={300}
                            className="w-full h-full object-contain rounded-md"
                        />
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center space-y-3 text-center pointer-events-none">
                        <div className="flex items-center justify-center  size-10 bg-muted rounded-md">
                            <CloudUpload className="size-5 text-muted-foreground" aria-hidden="true" />
                        </div>

                        <div>
                            <p className="text-sm font-medium text-foreground">
                                Select a file or drag and drop here
                            </p>
                            <p className="text-xs text-muted-foreground">
                                JPG, PNG or PDF, file size no more than 10MB
                            </p>
                        </div>

                    </div>
                )}
                <input
                    ref={ref}
                    type="file"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    accept=".jpg,.jpeg,.png,.pdf"
                    onChange={handleFileChange}
                    {...props}
                />
            </div>
        )
    }
)

FileUpload.displayName = "FileUpload"
