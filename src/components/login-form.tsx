import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <FieldGroup>
        <div className="flex flex-col items-start gap-1 text-start">
          <h1 className="text-2xl font-bold">Login</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Enter your username and password
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="email">Username</FieldLabel>
          <Input id="email" type="email" placeholder="m@example.com" className="shadow-none" required />
        </Field>
        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Input id="password" type="password" className="shadow-none" required />
        </Field>
        <Field>
          <Button type="submit" className="shadow-none">Login</Button>
        </Field>
      </FieldGroup>
    </form>
  )
}
