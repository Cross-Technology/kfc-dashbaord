import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { FileUpload } from "../media-upload/file-upload"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const frameworks = [
    "Next.js",
    "SvelteKit",
    "Nuxt.js",
    "Remix",
    "Astro",
] as const

const CategoryForm = () => {
    return (
        <FieldSet className="w-full py-8">
            {/* upload thumbnail */}
            <FieldGroup>
                <Field>
                    <FieldLabel htmlFor="thumbnail">Thumbnail</FieldLabel>
                    <FileUpload id="thumbnail" />
                </Field>
            </FieldGroup>
            <FieldGroup className="grid grid-cols-2 w-full gap-3">
                <Field>
                    <FieldLabel htmlFor="title">Category Name<span className="text-destructive">*</span></FieldLabel>
                    <Input id="title" type="text" placeholder="Enter category name" />
                </Field>
                <Field>
                    <FieldLabel htmlFor="title">Parent Category</FieldLabel>
                    <Select>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select parent category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="light">Light</SelectItem>
                                <SelectItem value="dark">Dark</SelectItem>
                                <SelectItem value="system">System</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </Field>
            </FieldGroup>
            <FieldGroup>
                <Field>
                    <FieldLabel htmlFor="description">Description</FieldLabel>
                    <Textarea id="description" placeholder="Enter description" />
                </Field>
            </FieldGroup>
        </FieldSet>
    )
}

export default CategoryForm