"use client"

import { cn } from "@/lib/utils"
import { useEditor, EditorContent, useEditorState } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Underline from "@tiptap/extension-underline"
import { TextStyle } from "@tiptap/extension-text-style"
import Color from "@tiptap/extension-color"
import Highlight from "@tiptap/extension-highlight"
import TextAlign from "@tiptap/extension-text-align"
import Image from "@tiptap/extension-image"
import LinkExtension from "@tiptap/extension-link"
import { useState, useRef } from "react"
import { Bold, Heading1, Heading2, Heading3, Heading4, Heading5, Heading6, Italic, List, ListOrdered, Underline as UnderlineIcon, Palette, Highlighter, Ban, AlignLeft, AlignCenter, AlignRight, AlignJustify, ChevronDown, ImageIcon, Link, Unlink } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

// Small helper so every toolbar button gets a tooltip without repetition
const Tip = ({ label, children }: { label: string; children: React.ReactNode }) => (
    <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent side="bottom" className="text-xs">{label}</TooltipContent>
    </Tooltip>
)

const TEXT_COLORS = [
    { label: "Default", value: "" },
    { label: "Red", value: "#fca5a5" },
    { label: "Orange", value: "#fdba74" },
    { label: "Yellow", value: "#fde68a" },
    { label: "Green", value: "#86efac" },
    { label: "Blue", value: "#93c5fd" },
    { label: "Purple", value: "#c4b5fd" },
    { label: "Pink", value: "#f9a8d4" },
    { label: "Gray", value: "#9ca3af" },
    { label: "Dark", value: "#374151" },
    { label: "Black", value: "#000000" },
]

const HIGHLIGHT_COLORS = [
    { label: "Green", value: "#bbf7d0" },
    { label: "Blue", value: "#bfdbfe" },
    { label: "Pink", value: "#fecaca" },
    { label: "Purple", value: "#e9d5ff" },
    { label: "Yellow", value: "#fef08a" },
    { label: "Orange", value: "#fed7aa" },
    { label: "Teal", value: "#99f6e4" },
]

const InputEditor = () => {
    const [headingLevel, setHeadingLevel] = useState<string>("p")
    const [imageUrl, setImageUrl] = useState("")
    const [linkUrl, setLinkUrl] = useState("")
    const [linkText, setLinkText] = useState("")
    const fileInputRef = useRef<HTMLInputElement>(null)


    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            TextStyle,
            Color,
            Highlight.configure({ multicolor: true }),
            TextAlign.configure({ types: ["heading", "paragraph"] }),
            Image.configure({ inline: false, allowBase64: true }),
            LinkExtension.configure({ openOnClick: false, autolink: true }),
        ],
        content: "",
        immediatelyRender: false,
        editorProps: {
            attributes: {
                class: cn("prose prose-heading:font-semibold focus:outline-none min-h-[200px]",
                    "prose-h1:text-3xl prose-h1:m-0 prose-h1:text-foreground",
                    "prose-h2:text-2xl prose-h2:m-0 prose-h2:text-foreground",
                    "prose-h3:text-xl prose-h3:m-0 prose-h3:text-foreground",
                    "prose-h4:text-lg prose-h4:m-0 prose-h4:text-foreground",
                    "prose-h5:text-md prose-h5:m-0 prose-h5:text-foreground",
                    "prose-h6:text-sm prose-h6:m-0 prose-h6:text-foreground",
                    "prose-p:text-sm prose-p:my-3 prose-p:text-foreground",
                    "prose-ul:list-disc prose-ol:list-decimal prose-li:-my-2",
                ),
            },
        },
    })

    const editorState = useEditorState({
        editor,
        selector: (ctx) => ({
            isBold: ctx.editor?.isActive("bold") ?? false,
            isItalic: ctx.editor?.isActive("italic") ?? false,
            isUnderline: ctx.editor?.isActive("underline") ?? false,
            isBulletList: ctx.editor?.isActive("bulletList") ?? false,
            isOrderedList: ctx.editor?.isActive("orderedList") ?? false,
            currentAlign: (ctx.editor?.getAttributes("paragraph")?.textAlign as string)
                ?? (ctx.editor?.getAttributes("heading")?.textAlign as string)
                ?? "left",
            currentColor: (ctx.editor?.getAttributes("textStyle")?.color as string) ?? "",
            currentHighlight: (ctx.editor?.getAttributes("highlight")?.color as string) ?? "",
            isLink: ctx.editor?.isActive("link") ?? false,
            currentLink: (ctx.editor?.getAttributes("link")?.href as string) ?? "",
        }),
    })

    if (!editor) return (
        <div className="relative overflow-hidden w-full h-[250px]  border border-input rounded-md animate-pulse">
            {/* Toolbar skeleton */}
            <div className="flex items-center gap-1.5 py-0.5 px-3 bg-muted h-10 border-b border-border">
                <div className="size-6 rounded bg-muted-foreground/10" />
                <div className="size-6 rounded bg-muted-foreground/10" />
                <div className="size-6 rounded bg-muted-foreground/10" />
                <div className="size-6 rounded bg-muted-foreground/10" />
                <div className="size-6 rounded bg-muted-foreground/10" />
                <div className="w-px h-5 bg-border" />
                <div className="h-7 w-32 rounded bg-muted-foreground/10" />
                <div className="w-px h-5 bg-border" />
                <div className="size-6 rounded bg-muted-foreground/10" />
                <div className="size-6 rounded bg-muted-foreground/10" />
                <div className="w-px h-5 bg-border" />
                <div className="h-6 w-10 rounded bg-muted-foreground/10" />
                <div className="w-px h-5 bg-border" />
                <div className="size-6 rounded bg-muted-foreground/10" />
                <div className="size-6 rounded bg-muted-foreground/10" />
            </div>
            {/* Content skeleton */}
            {/* <div className="p-3 space-y-2 min-h-[220px]">
                <div className="h-3 w-3/4 rounded bg-muted" />
                <div className="h-3 w-full rounded bg-muted" />
                <div className="h-3 w-5/6 rounded bg-muted" />
            </div> */}
        </div>
    )

    const headingIcons = {
        1: Heading1, 2: Heading2, 3: Heading3,
        4: Heading4, 5: Heading5, 6: Heading6,
    } as const

    const handleHeadingChange = (value: string) => {
        setHeadingLevel(value)
        if (value === "p") {
            editor.chain().focus().setParagraph().run()
        } else {
            const level = Number(value) as 1 | 2 | 3 | 4 | 5 | 6
            editor.chain().focus().toggleHeading({ level }).run()
        }
    }

    const handleColorChange = (color: string) => {
        if (color === "") {
            editor.chain().focus().unsetColor().run()
        } else {
            editor.chain().focus().setColor(color).run()
        }
    }

    const handleHighlightChange = (color: string) => {
        if (color === "") {
            editor.chain().focus().unsetHighlight().run()
        } else {
            editor.chain().focus().setHighlight({ color }).run()
        }
    }

    const activeColor = editorState?.currentColor ?? ""
    const activeHighlight = editorState?.currentHighlight ?? ""

    return (
        <div className="relative overflow-hidden w-full border border-input rounded-md transition-[color,box-shadow] focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/50">
            <div className="flex flex-col gap-0">
                {/* Toolbar */}
                <div className="flex items-center gap-1.5 py-0.5 px-3 bg-muted h-10 border-b border-border">

                    {/* Bold */}
                    <Tip label="Bold">
                        <Button type="button" size="icon" variant={editorState?.isBold ? "default" : "ghost"}
                            onClick={() => editor.chain().focus().toggleBold().run()}
                            className="size-6 transition-colors duration-200">
                            <Bold className="size-4" />
                        </Button>
                    </Tip>

                    {/* Italic */}
                    <Tip label="Italic">
                        <Button type="button" size="icon" variant={editorState?.isItalic ? "default" : "ghost"}
                            onClick={() => editor.chain().focus().toggleItalic().run()}
                            className="size-6 transition-colors duration-200">
                            <Italic className="size-4" />
                        </Button>
                    </Tip>

                    {/* Underline */}
                    <Tip label="Underline">
                        <Button type="button" size="icon" variant={editorState?.isUnderline ? "default" : "ghost"}
                            onClick={() => editor.chain().focus().toggleUnderline().run()}
                            className="size-6 transition-colors duration-200">
                            <UnderlineIcon className="size-4" />
                        </Button>
                    </Tip>

                    {/* Text Color Picker */}
                    <Popover>
                        <PopoverTrigger asChild>
                            <Tip label="Text color">
                                <Button
                                    type="button"
                                    size="icon"
                                    variant={activeColor ? "default" : "ghost"}
                                    className="size-6 px-0 transition-colors duration-200"
                                >
                                    <span className="flex flex-col items-center gap-0">
                                        <Palette className="size-3.5" style={{ color: activeColor }} />
                                    </span>
                                </Button>
                            </Tip>
                        </PopoverTrigger>
                        <PopoverContent align="start" className="w-auto p-2">
                            <div className="flex items-center gap-1.5">
                                {TEXT_COLORS.filter(c => c.value !== "").map((c) => (
                                    <button
                                        key={c.value}
                                        type="button"
                                        title={c.label}
                                        onClick={() => handleColorChange(c.value)}
                                        className={cn(
                                            "size-7 rounded-full border-2 transition-transform hover:scale-110 duration-150 cursor-pointer",
                                            activeColor === c.value
                                                ? "border-foreground/50 scale-110"
                                                : "border-transparent"
                                        )}
                                        style={{ backgroundColor: c.value }}
                                    />
                                ))}
                                <div className="w-px h-5 bg-border mx-0.5" />
                                <Button
                                    type="button"
                                    size="icon"
                                    variant="ghost"
                                    title="Remove color"
                                    onClick={() => handleColorChange("")}
                                    className="size-8"
                                >
                                    <Ban className="size-5" />
                                </Button>
                            </div>
                        </PopoverContent>
                    </Popover>

                    {/* Highlight Picker */}
                    <Popover>
                        <PopoverTrigger asChild>
                            <Tip label="Highlight">
                                <Button
                                    type="button"
                                    size="icon"
                                    variant={activeHighlight ? "default" : "ghost"}
                                    className="size-6 px-0 transition-colors duration-200"
                                >
                                    <span className="flex flex-col items-center gap-0">
                                        <Highlighter className="size-3.5" style={{ color: activeHighlight }} />
                                    </span>
                                </Button>
                            </Tip>
                        </PopoverTrigger>
                        <PopoverContent align="start" className="w-auto p-2">
                            <div className="flex items-center gap-1.5">
                                {HIGHLIGHT_COLORS.map((c) => (
                                    <button
                                        key={c.value}
                                        type="button"
                                        title={c.label}
                                        onClick={() => handleHighlightChange(c.value)}
                                        className={cn(
                                            "size-7 rounded-full border-2 transition-transform hover:scale-110 duration-150 cursor-pointer",
                                            activeHighlight === c.value
                                                ? "border-foreground/50 scale-110"
                                                : "border-transparent"
                                        )}
                                        style={{ backgroundColor: c.value }}
                                    />
                                ))}
                                <div className="w-px h-5 bg-border mx-0.5" />
                                <Button
                                    type="button"
                                    size="icon"
                                    variant="ghost"
                                    title="Remove highlight"
                                    onClick={() => handleHighlightChange("")}
                                    className="size-8" >
                                    <Ban className="size-5 text-muted-foreground" />
                                </Button>
                            </div>
                        </PopoverContent>
                    </Popover>

                    <div className="w-px h-5 bg-border" />

                    {/* Heading Select */}
                    <Select value={headingLevel} onValueChange={handleHeadingChange}>
                        <SelectTrigger size="sm" className="w-32 border-0 shadow-none bg-transparent focus-visible:ring-0 focus-visible:border-0">
                            <SelectValue placeholder="Style" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="p">Paragraph</SelectItem>
                            {([1, 2, 3, 4, 5, 6] as const).map((level) => {
                                const HeadingIcon = headingIcons[level]
                                return (
                                    <SelectItem key={level} value={String(level)}>
                                        <HeadingIcon className="size-4" /> Heading {level}
                                    </SelectItem>
                                )
                            })}
                        </SelectContent>
                    </Select>

                    <div className="w-px h-5 bg-border" />

                    {/* Bullet List */}
                    <Tip label="Bullet list">
                        <Button type="button" size="icon" variant={editorState?.isBulletList ? "default" : "ghost"}
                            onClick={() => editor.chain().focus().toggleBulletList().run()}
                            className="size-6 transition-colors duration-200">
                            <List className="size-4" />
                        </Button>
                    </Tip>

                    {/* Ordered List */}
                    <Tip label="Ordered list">
                        <Button type="button" size="icon" variant={editorState?.isOrderedList ? "default" : "ghost"}
                            onClick={() => editor.chain().focus().toggleOrderedList().run()}
                            className="size-6 transition-colors duration-200">
                            <ListOrdered className="size-4" />
                        </Button>
                    </Tip>

                    <div className="w-px h-5 bg-border" />

                    {/* Text Align Dropdown */}
                    {(() => {
                        const alignOptions = [
                            { value: "left", icon: AlignLeft, label: "Align left" },
                            { value: "center", icon: AlignCenter, label: "Align center" },
                            { value: "right", icon: AlignRight, label: "Align right" },
                            { value: "justify", icon: AlignJustify, label: "Justify" },
                        ] as const
                        const current = editorState?.currentAlign ?? "left"
                        const ActiveIcon = alignOptions.find(a => a.value === current)?.icon ?? AlignLeft
                        return (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Tip label="Text alignment">
                                        <Button type="button" variant="ghost"
                                            className="h-6 w-10 px-1 transition-colors duration-200">
                                            <ActiveIcon className="size-3.5" />
                                            <ChevronDown className="size-3 text-muted-foreground" />
                                        </Button>
                                    </Tip>
                                </PopoverTrigger>
                                <PopoverContent align="start" className="w-auto p-1">
                                    <div className="flex items-center gap-0.5">
                                        {alignOptions.map(({ value, icon: Icon, label }) => (
                                            <Button
                                                key={value}
                                                type="button"
                                                size="icon"
                                                variant={current === value ? "default" : "ghost"}
                                                className="size-7"
                                                title={label}
                                                onClick={() => editor.chain().focus().setTextAlign(value).run()}
                                            >
                                                <Icon className="size-4" />
                                            </Button>
                                        ))}
                                    </div>
                                </PopoverContent>
                            </Popover>
                        )
                    })()}

                    <div className="w-px h-5 bg-border" />

                    {/* Insert Image */}
                    <Popover>
                        <PopoverTrigger asChild>
                            <Tip label="Insert image">
                                <Button type="button" size="icon" variant="ghost"
                                    className="size-6 transition-colors duration-200">
                                    <ImageIcon className="size-3.5" />
                                </Button>
                            </Tip>
                        </PopoverTrigger>
                        <PopoverContent align="start" className="w-72 p-3 space-y-3">
                            <p className="text-xs font-medium text-muted-foreground">Insert Image</p>

                            {/* URL input */}
                            <div className="flex gap-2">
                                <div className="flex items-center flex-1 gap-1.5 border border-border rounded px-2 py-1">
                                    <Link className="size-3.5 text-muted-foreground shrink-0" />
                                    <input
                                        type="url"
                                        placeholder="Paste image URL…"
                                        value={imageUrl}
                                        onChange={(e) => setImageUrl(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter" && imageUrl.trim()) {
                                                editor.chain().focus().setImage({ src: imageUrl.trim() }).run()
                                                setImageUrl("")
                                            }
                                        }}
                                        className="flex-1 text-xs bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
                                    />
                                </div>
                                <Button
                                    type="button"
                                    size="sm"
                                    className="h-7 px-2 text-xs"
                                    disabled={!imageUrl.trim()}
                                    onClick={() => {
                                        if (imageUrl.trim()) {
                                            editor.chain().focus().setImage({ src: imageUrl.trim() }).run()
                                            setImageUrl("")
                                        }
                                    }}
                                >
                                    Insert
                                </Button>
                            </div>

                            <div className="flex items-center gap-2">
                                <div className="flex-1 h-px bg-border" />
                                <span className="text-[10px] text-muted-foreground">or</span>
                                <div className="flex-1 h-px bg-border" />
                            </div>

                            {/* File upload */}
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => {
                                    const file = e.target.files?.[0]
                                    if (!file) return
                                    const reader = new FileReader()
                                    reader.onload = (ev) => {
                                        const src = ev.target?.result as string
                                        if (src) editor.chain().focus().setImage({ src }).run()
                                    }
                                    reader.readAsDataURL(file)
                                    e.target.value = ""
                                }}
                            />
                            <Button
                                type="button"
                                variant="outline"
                                className="w-full h-8 text-xs gap-1.5"
                                onClick={() => fileInputRef.current?.click()}
                            >
                                <ImageIcon className="size-3.5" />
                                Upload from device
                            </Button>
                        </PopoverContent>
                    </Popover>

                    {/* Insert Link */}
                    <Popover onOpenChange={(open) => {
                        if (open) {
                            setLinkUrl(editorState?.currentLink ?? "")
                            setLinkText("")
                        }
                    }}>
                        <PopoverTrigger asChild>
                            <Tip label="Insert link">
                                <Button type="button" size="icon"
                                    variant={editorState?.isLink ? "default" : "ghost"}
                                    className="size-6 transition-colors duration-200">
                                    <Link className="size-3.5" />
                                </Button>
                            </Tip>
                        </PopoverTrigger>
                        <PopoverContent align="start" className="w-72 p-3 space-y-2">
                            <p className="text-xs font-medium text-muted-foreground">Insert Link</p>

                            {/* URL */}
                            <div className="flex items-center gap-1.5 border border-border rounded px-2 py-1">
                                <Link className="size-3.5 text-muted-foreground shrink-0" />
                                <input
                                    type="url"
                                    placeholder="https://"
                                    value={linkUrl}
                                    onChange={(e) => setLinkUrl(e.target.value)}
                                    className="flex-1 text-xs bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
                                />
                            </div>

                            {/* Display text (only when no selection) */}
                            <div className="flex items-center gap-1.5 border border-border rounded px-2 py-1">
                                <span className="text-[10px] text-muted-foreground shrink-0 w-8">Text</span>
                                <input
                                    type="text"
                                    placeholder="Display text (optional)"
                                    value={linkText}
                                    onChange={(e) => setLinkText(e.target.value)}
                                    className="flex-1 text-xs bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
                                />
                            </div>

                            <div className="flex gap-2 pt-1">
                                <Button
                                    type="button"
                                    className="flex-1 h-7 text-xs"
                                    disabled={!linkUrl.trim()}
                                    onClick={() => {
                                        if (!linkUrl.trim()) return
                                        if (linkText.trim()) {
                                            // Insert link with custom text
                                            editor.chain().focus()
                                                .insertContent(`<a href="${linkUrl.trim()}">${linkText.trim()}</a>`)
                                                .run()
                                        } else {
                                            // Apply link to current selection
                                            editor.chain().focus().setLink({ href: linkUrl.trim(), target: "_blank" }).run()
                                        }
                                        setLinkUrl("")
                                        setLinkText("")
                                    }}
                                >
                                    Apply
                                </Button>
                                {editorState?.isLink && (
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="h-7 px-2 text-xs gap-1"
                                        onClick={() => editor.chain().focus().unsetLink().run()}
                                    >
                                        <Unlink className="size-3.5" />
                                        Remove
                                    </Button>
                                )}
                            </div>
                        </PopoverContent>
                    </Popover>

                </div>

                {/* Editor Content */}
                <div className="px-3">
                    <EditorContent editor={editor} />
                </div>
            </div>
        </div>
    )
}

export default InputEditor