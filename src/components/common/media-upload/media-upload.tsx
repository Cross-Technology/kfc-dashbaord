"use client"

import { useRef, useState, useCallback, useEffect, useMemo, forwardRef } from "react"
import { createPortal } from "react-dom"
import { ImageIcon, X, Plus, Upload, GripHorizontal, CloudUpload } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

// ─── Types ────────────────────────────────────────────────────────────────────

export type MediaFile = {
    id: string
    file?: File
    url: string
    name: string
}

interface MediaUploadProps {
    value?: MediaFile[]
    onChange?: (files: MediaFile[]) => void
    accept?: string
    maxFiles?: number
    hint?: string
    className?: string
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fileToMedia(file: File): MediaFile {
    return {
        id: `${file.name}-${Date.now()}-${Math.random()}`,
        file,
        url: URL.createObjectURL(file),
        name: file.name,
    }
}

function reorder<T>(arr: T[], from: number, to: number): T[] {
    const next = [...arr]
    const [item] = next.splice(from, 1)
    next.splice(to, 0, item)
    return next
}

/** Returns true if the point is within the inner 60% of the rect (avoids edge jitter). */
function isInsideInnerRect(rect: DOMRect, x: number, y: number): boolean {
    const insetX = rect.width * 0.2
    const insetY = rect.height * 0.2
    return (
        x >= rect.left + insetX &&
        x <= rect.right - insetX &&
        y >= rect.top + insetY &&
        y <= rect.bottom - insetY
    )
}

// ─── Component ────────────────────────────────────────────────────────────────

export function MediaUpload({
    value,
    onChange,
    accept = "image/*,video/*",
    maxFiles = 0,
    hint = "Accepts images, videos, or 3D models",
    className,
}: MediaUploadProps) {
    const [internalFiles, setInternalFiles] = useState<MediaFile[]>([])
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [dropZoneDragging, setDropZoneDragging] = useState(false)

    // ── Drag state ────────────────────────────────────────────────────────────
    const [dragId, setDragId] = useState<string | null>(null)
    const [overId, setOverId] = useState<string | null>(null)
    const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 })

    const thumbRefs = useRef<Record<string, HTMLDivElement | null>>({})
    const originalFilesRef = useRef<MediaFile[]>([])
    const filesRef = useRef<MediaFile[]>([])

    // Debounce timer ref — prevents rapid overId toggling
    const overTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
    const pendingOverRef = useRef<string | null>(null)

    const files = value ?? internalFiles
    filesRef.current = files

    // ── Commit helpers ────────────────────────────────────────────────────────
    const commit = useCallback(
        (next: MediaFile[]) => {
            if (onChange) onChange(next)
            else setInternalFiles(next)
        },
        [onChange]
    )

    const push = useCallback(
        (added: MediaFile[]) => {
            const next =
                maxFiles > 0
                    ? [...filesRef.current, ...added].slice(0, maxFiles)
                    : [...filesRef.current, ...added]
            commit(next)
        },
        [maxFiles, commit]
    )

    const remove = useCallback(
        (id: string) => commit(filesRef.current.filter((f) => f.id !== id)),
        [commit]
    )

    // ── File input / drop-zone ─────────────────────────────────────────────────
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        push(Array.from(e.target.files ?? []).map(fileToMedia))
        e.target.value = ""
    }

    const handleZoneDrop = (e: React.DragEvent) => {
        e.preventDefault()
        setDropZoneDragging(false)
        if (e.dataTransfer.files.length > 0) {
            push(Array.from(e.dataTransfer.files).map(fileToMedia))
        }
    }

    // ── Drag start ─────────────────────────────────────────────────────────────
    const handlePointerDown = useCallback((e: React.PointerEvent, id: string) => {
        if (e.button !== 0) return
        e.currentTarget.setPointerCapture(e.pointerId)
        originalFilesRef.current = [...filesRef.current]
        setDragId(id)
        setOverId(null)
        pendingOverRef.current = null
        setCursorPos({ x: e.clientX, y: e.clientY })
    }, [])

    // ── Compute visual order (live preview) ────────────────────────────────────
    const displayFiles = useMemo(() => {
        if (!dragId || !overId) return files
        const fromIdx = files.findIndex((f) => f.id === dragId)
        const toIdx = files.findIndex((f) => f.id === overId)
        if (fromIdx === -1 || toIdx === -1 || fromIdx === toIdx) return files
        return reorder(files, fromIdx, toIdx)
    }, [files, dragId, overId])

    // ── Global pointer events ─────────────────────────────────────────────────
    useEffect(() => {
        if (!dragId) return

        const DEBOUNCE_MS = 80 // ms the cursor must sit inside a thumb before we switch

        const onMove = (e: PointerEvent) => {
            setCursorPos({ x: e.clientX, y: e.clientY })

            // Hit-test using the inset rect to avoid edge jitter
            let hit: string | null = null
            for (const [id, el] of Object.entries(thumbRefs.current)) {
                if (id === dragId || !el) continue
                const rect = el.getBoundingClientRect()
                if (isInsideInnerRect(rect, e.clientX, e.clientY)) {
                    hit = id
                    break
                }
            }

            // If the hit is the same as what's already pending/active, do nothing
            if (hit === pendingOverRef.current) return

            // Clear any pending timer
            if (overTimerRef.current) {
                clearTimeout(overTimerRef.current)
                overTimerRef.current = null
            }

            pendingOverRef.current = hit

            if (hit === null) {
                // Immediately clear highlight when leaving all thumbs
                setOverId(null)
            } else {
                // Delay setting a NEW target to avoid jitter
                overTimerRef.current = setTimeout(() => {
                    setOverId(hit)
                    overTimerRef.current = null
                }, DEBOUNCE_MS)
            }
        }

        const onUp = () => {
            cleanup()
            const currentOverId = overId
            if (currentOverId && currentOverId !== dragId) {
                const src = filesRef.current
                const from = src.findIndex((f) => f.id === dragId)
                const to = src.findIndex((f) => f.id === currentOverId)
                if (from !== -1 && to !== -1) commit(reorder(src, from, to))
            }
            setDragId(null)
            setOverId(null)
        }

        const onCancel = () => {
            cleanup()
            commit(originalFilesRef.current)
            setDragId(null)
            setOverId(null)
        }

        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onCancel()
        }

        const cleanup = () => {
            if (overTimerRef.current) {
                clearTimeout(overTimerRef.current)
                overTimerRef.current = null
            }
            pendingOverRef.current = null
        }

        window.addEventListener("pointermove", onMove)
        window.addEventListener("pointerup", onUp)
        window.addEventListener("pointercancel", onCancel)
        window.addEventListener("keydown", onKey)
        return () => {
            cleanup()
            window.removeEventListener("pointermove", onMove)
            window.removeEventListener("pointerup", onUp)
            window.removeEventListener("pointercancel", onCancel)
            window.removeEventListener("keydown", onKey)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dragId, overId, commit])

    const canAddMore = maxFiles === 0 || files.length < maxFiles
    const draggedFile = dragId ? files.find((f) => f.id === dragId) : null

    // ── Empty state ───────────────────────────────────────────────────────────
    if (files.length === 0) {
        return (
            <div
                onDragOver={(e) => { e.preventDefault(); setDropZoneDragging(true) }}
                onDragLeave={() => setDropZoneDragging(false)}
                onDrop={handleZoneDrop}
                onClick={() => fileInputRef.current?.click()}
                className={cn(
                    "relative flex min-h-[180px] hover:bg-muted/50 cursor-pointer flex-col items-center justify-center gap-2 rounded-md border border-dashed border-border transition-colors duration-200",
                    dropZoneDragging && "border-primary bg-primary/5",
                    className
                )}
            >
                <input ref={fileInputRef} type="file" accept={accept} multiple={maxFiles !== 1} className="hidden" onChange={handleInputChange} />

                <div className="flex items-center justify-center size-10 bg-muted rounded-md">
                    <CloudUpload className="size-5 text-muted-foreground" aria-hidden="true" />
                </div>

                <div className="text-center">
                    <p className="text-sm font-medium text-foreground">
                        Select a file or drag and drop here
                    </p>
                    <p className="text-xs text-muted-foreground">
                        {hint || "JPG, PNG or PDF, file size no more than 10MB"}
                    </p>
                </div>
            </div>
        )
    }

    // ── Filled state ──────────────────────────────────────────────────────────
    const [first, ...rest] = displayFiles

    return (
        <>
            <div className={cn("flex gap-2", className)}>
                <input ref={fileInputRef} type="file" accept={accept} multiple={maxFiles !== 1} className="hidden" onChange={handleInputChange} />

                {/* Featured first image */}
                <div className="relative shrink-0">
                    <MediaThumb
                        ref={(el) => { thumbRefs.current[first.id] = el }}
                        file={first}
                        onRemove={() => remove(first.id)}
                        className="h-[200px] w-[200px] rounded-md"
                        isBeingDragged={dragId === first.id}
                        onPointerDown={(e) => handlePointerDown(e, first.id)}
                    />
                </div>

                {/* Smaller thumbs + add */}
                <div className="flex flex-wrap content-start gap-2">
                    {rest.map((f) => (
                        <MediaThumb
                            key={f.id}
                            ref={(el) => { thumbRefs.current[f.id] = el }}
                            file={f}
                            onRemove={() => remove(f.id)}
                            className="h-[96px] w-[96px] rounded-md"
                            isBeingDragged={dragId === f.id}
                            onPointerDown={(e) => handlePointerDown(e, f.id)}
                        />
                    ))}

                    {canAddMore && (
                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className={cn(
                                "flex h-[96px] w-[96px] cursor-pointer items-center justify-center rounded-md border-2 border-dashed border-border",
                                "text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                            )}
                            title="Add more"
                        >
                            <Plus className="size-5" />
                        </button>
                    )}
                </div>
            </div>

            {/* Floating drag preview */}
            {draggedFile && typeof window !== "undefined" && createPortal(
                <div
                    style={{
                        position: "fixed",
                        left: cursorPos.x + 14,
                        top: cursorPos.y + 14,
                        width: 100,
                        height: 100,
                        pointerEvents: "none",
                        zIndex: 9999,
                    }}
                    className="overflow-hidden rounded-2xl border-2 border-primary shadow-2xl rotate-3"
                >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={draggedFile.url}
                        alt={draggedFile.name}
                        className="h-full w-full object-cover"
                        draggable={false}
                    />
                </div>,
                document.body
            )}
        </>
    )
}

// ─── Thumbnail ────────────────────────────────────────────────────────────────

const MediaThumb = forwardRef<HTMLDivElement, {
    file: MediaFile
    onRemove: () => void
    className?: string
    isBeingDragged: boolean
    onPointerDown: (e: React.PointerEvent) => void
}>(function MediaThumb({ file, onRemove, className, isBeingDragged, onPointerDown }, ref) {
    const isVideo = file.file?.type.startsWith("video") ?? file.url.match(/\.(mp4|webm|ogg)$/i)

    return (
        <div
            ref={ref}
            onPointerDown={onPointerDown}
            className={cn(
                // transition-all gives a smooth slide when positions change
                "group relative overflow-hidden bg-muted border-2 border-border select-none",
                "transition-all duration-200 ease-in-out",
                isBeingDragged
                    ? "opacity-30 scale-[0.92] cursor-grabbing"
                    : "cursor-grab",
                className
            )}
        >
            {isVideo ? (
                <video src={file.url} className="h-full w-full object-cover pointer-events-none" />
            ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={file.url} alt={file.name} className="h-full w-full object-cover pointer-events-none" draggable={false} />
            )}

            {!file.url && (
                <div className="flex h-full w-full items-center justify-center">
                    <ImageIcon className="size-6 text-muted-foreground" />
                </div>
            )}

            {!isBeingDragged && (
                <>
                    <div
                        className={cn(
                            "absolute left-1 top-1 flex size-5 items-center justify-center rounded-sm",
                            "bg-black/60 text-white opacity-0 transition-opacity group-hover:opacity-100"
                        )}
                        title="Drag to reorder"
                    >
                        <GripHorizontal className="size-3.5" />
                    </div>
                    <button
                        type="button"
                        onPointerDown={(e) => e.stopPropagation()}
                        onClick={onRemove}
                        className={cn(
                            "absolute right-1 top-1 flex size-5 items-center justify-center rounded-full",
                            "bg-black/60 text-white opacity-0 transition-opacity group-hover:opacity-100 hover:bg-black/80"
                        )}
                        title="Remove"
                    >
                        <X className="size-3" />
                    </button>
                </>
            )}
        </div>
    )
})
