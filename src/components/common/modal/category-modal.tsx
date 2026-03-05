import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import CategoryForm from "../form/category-form"

interface Props {
    open: boolean
    onOpenChange: (open: boolean) => void
    isLoading?: boolean

}

const CategoryModal: React.FC<Props> = ({ open, onOpenChange, isLoading }) => {
    const handleDialogOpenChange = (open: boolean) => {
        onOpenChange(open)
    }
    return (
        <Dialog open={open} onOpenChange={handleDialogOpenChange}>
            <form>
                <DialogContent className="sm:max-w-xl">
                    <DialogHeader>
                        <DialogTitle>Add Category</DialogTitle>
                    </DialogHeader>
                    <CategoryForm />
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button onClick={() => handleDialogOpenChange(false)} variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button disabled={isLoading} type="submit">Save</Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}

export default CategoryModal