"use client"

import { useState } from "react"
import InputEditor from "@/components/common/text-editor/input-editot"
import { MediaUpload, type MediaFile } from "@/components/common/media-upload/media-upload"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel, FieldLegend, FieldSet } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Combobox, ComboboxChips, ComboboxChip, ComboboxChipsInput, ComboboxContent, ComboboxList, ComboboxItem, ComboboxEmpty, useComboboxAnchor, ComboboxValue } from "@/components/ui/combobox"
import React from "react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button"
import { BadgePlusIcon, ChevronDownIcon, ChevronsUpDown, ChevronUpIcon, InfoIcon, MaximizeIcon, MinimizeIcon } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

const listTags = [
    "technology",
    "design",
    "business",
    "marketing",
    "education",
    "health",
] as const

const ProductFormPageContent = () => {
    const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([])
    const [tags, setTags] = useState<string[]>([])
    const anchor = useComboboxAnchor()
    const [isOpenCollapsible, setIsOpenCollapsible] = React.useState(false)

    return (
        <section className="@container/main flex flex-1 flex-col gap-5 py-5">
            <form className="w-full max-w-6xl mx-auto grid grid-cols-12 gap-4">
                {/* Left Side */}
                <div className="w-full col-span-12 lg:col-span-8 flex flex-col gap-4">
                    <Card className=" shadow-none">
                        <CardContent>
                            <FieldSet>
                                <FieldLegend className="mb-5 text-sm!">Menu Information</FieldLegend>
                                <FieldGroup>
                                    <Field>
                                        <FieldLabel htmlFor="title">Title<span className="text-destructive">*</span></FieldLabel>
                                        <Input id="title" type="text" placeholder="Enter menu title" />
                                    </Field>
                                    <Field>
                                        <FieldLabel htmlFor="title">Description</FieldLabel>
                                        <InputEditor />
                                    </Field>
                                    <Field>
                                        <FieldLabel>Media</FieldLabel>
                                        <MediaUpload
                                            value={mediaFiles}
                                            onChange={setMediaFiles}
                                            accept="image/*,video/*"
                                            hint="JPG, PNG or PDF, file size no more than 10MB"
                                        />
                                    </Field>
                                </FieldGroup>
                            </FieldSet>
                        </CardContent>
                    </Card>

                    <Card className="w-full col-span-12 lg:col-span-4 shadow-none">
                        <CardHeader>
                            <CardTitle className="text-sm!">Variants</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Button type="button" variant="outline" size="xs">
                                <BadgePlusIcon />  Add option like size, color, etc.
                            </Button>
                        </CardContent>
                    </Card>
                </div>
                {/* Right Side */}
                <div className="w-full col-span-12 lg:col-span-4 flex flex-col gap-4">
                    <Card className="w-full col-span-12 lg:col-span-4 shadow-none">
                        <CardContent>
                            <FieldSet>
                                <Field>
                                    <FieldLabel htmlFor="status">Status</FieldLabel>
                                    <Select defaultValue="active">
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectItem value="active">Active</SelectItem>
                                                <SelectItem value="draft">Draft</SelectItem>
                                                <SelectItem value="unlisted">Unlisted</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </Field>
                            </FieldSet>
                        </CardContent>
                    </Card>
                    <Card className="w-full col-span-12 lg:col-span-4 shadow-none">
                        <CardContent>
                            <FieldSet>
                                <FieldLegend className="mb-5 text-sm!">Organization</FieldLegend>
                                <FieldGroup>
                                    <Field>
                                        <FieldLabel htmlFor="organization">Type<span className="text-destructive">*</span></FieldLabel>
                                        <Select>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectItem value="active">Active</SelectItem>
                                                    <SelectItem value="draft">Draft</SelectItem>
                                                    <SelectItem value="unlisted">Unlisted</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </Field>
                                    <Field>
                                        <FieldLabel htmlFor="organization">Category<span className="text-destructive">*</span></FieldLabel>
                                        <Select>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select category" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectItem value="active">Active</SelectItem>
                                                    <SelectItem value="draft">Draft</SelectItem>
                                                    <SelectItem value="unlisted">Unlisted</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </Field>
                                    <Field>
                                        <FieldLabel htmlFor="organization">Tags<span className="text-destructive">*</span></FieldLabel>
                                        <Combobox
                                            multiple
                                            autoHighlight
                                            items={listTags}
                                            value={tags}

                                            onValueChange={(val: any) => setTags(val)}>
                                            <ComboboxChips ref={anchor}>
                                                <ComboboxValue>
                                                    {(values) => (
                                                        <React.Fragment>
                                                            {values.map((value: string) => (
                                                                <ComboboxChip key={value}>
                                                                    {value}
                                                                </ComboboxChip>
                                                            ))}
                                                            <ComboboxChipsInput placeholder={tags.length === 0 ? "Select tags" : ""} />
                                                        </React.Fragment>
                                                    )}
                                                </ComboboxValue>
                                            </ComboboxChips>
                                            <ComboboxContent anchor={anchor} >
                                                <ComboboxEmpty>No results found</ComboboxEmpty>
                                                <ComboboxList>
                                                    {(item) => (
                                                        <ComboboxItem key={item} value={item}>
                                                            {item}
                                                        </ComboboxItem>
                                                    )}
                                                </ComboboxList>
                                            </ComboboxContent>
                                        </Combobox>
                                    </Field>

                                </FieldGroup>
                            </FieldSet>
                        </CardContent>
                    </Card>
                    <Card className="w-full col-span-12 lg:col-span-8 shadow-none">
                        <CardContent className="p-0">
                            <FieldSet>
                                <FieldGroup>
                                    <Field className="px-5 max-w-sm mb-2">
                                        <FieldLabel htmlFor="price">Price</FieldLabel>
                                        <Input id="price" type="text" placeholder="$ 0.00" />
                                    </Field>
                                    <Separator />
                                    <Collapsible open={isOpenCollapsible} onOpenChange={setIsOpenCollapsible} className="w-full px-5">
                                        <div className="flex items-center justify-between gap-4">
                                            {!isOpenCollapsible ? (
                                                <div className="flex flex-wrap items-center gap-2">
                                                    <Button
                                                        type="button"
                                                        onClick={() => setIsOpenCollapsible(!isOpenCollapsible)}
                                                        variant="secondary"
                                                        size="xs"
                                                        className="text-muted-foreground">
                                                        Compare at
                                                    </Button>
                                                    <Button
                                                        type="button"
                                                        onClick={() => setIsOpenCollapsible(!isOpenCollapsible)}
                                                        variant="secondary"
                                                        size="xs"
                                                        className="text-muted-foreground">
                                                        Unit price
                                                    </Button>
                                                    <Button
                                                        type="button"
                                                        onClick={() => setIsOpenCollapsible(true)}
                                                        variant="secondary"
                                                        size="xs"
                                                        className="text-muted-foreground">
                                                        Cost per item
                                                    </Button>
                                                </div>
                                            ) : (
                                                <p className="text-sm font-medium text-foreground">Additional display prices</p>
                                            )}
                                            <CollapsibleTrigger asChild>
                                                <Button variant="ghost" size="icon" className="size-8">
                                                    {isOpenCollapsible ? <ChevronDownIcon /> : <ChevronUpIcon />}
                                                    <span className="sr-only">Toggle details</span>
                                                </Button>
                                            </CollapsibleTrigger>

                                        </div>
                                        <CollapsibleContent className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
                                            <Field>
                                                <FieldLabel htmlFor="compare-at-price" >
                                                    Compare-at price
                                                </FieldLabel>
                                                <InputGroup className="shadow-none">
                                                    <InputGroupInput id="compare-at-price" placeholder="$ 0.00" />
                                                    <InputGroupAddon align="inline-end" className="cursor-pointer">
                                                        <Tooltip>
                                                            <TooltipTrigger asChild>
                                                                <InfoIcon />
                                                            </TooltipTrigger>
                                                            <TooltipContent className="max-w-[200px]">
                                                                <p>To display a markdown, enter a value higher than your price. Often shown with a strikethrough (e.g., $25.00).</p>
                                                            </TooltipContent>
                                                        </Tooltip>

                                                    </InputGroupAddon>
                                                </InputGroup>
                                            </Field>
                                            <Field>
                                                <FieldLabel htmlFor="unit-price">
                                                    Unit price
                                                </FieldLabel>
                                                <Input type="text" id="unit-price" placeholder="$ 0.00" />
                                            </Field>
                                        </CollapsibleContent>
                                    </Collapsible>
                                </FieldGroup>
                            </FieldSet>
                        </CardContent>
                    </Card>
                </div>

            </form>
        </section>
    )
}

export default ProductFormPageContent