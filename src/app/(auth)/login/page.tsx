import { GalleryVerticalEnd } from "lucide-react"

import { LoginForm } from "@/components/login-form"
import Image from "next/image"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex items-center gap-2 font-medium -tracking-wide">
          <Avatar className="rounded-md size-7">
            <AvatarImage
              src="/images/logo/kfc-logo.jpeg"
              alt="bong clock system"
              className="select-none pointer-events-none"
            />
            <AvatarFallback>KFC</AvatarFallback>
          </Avatar>
          KFC-Dashboard.
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="bg-muted relative overflow-hidden rounded-4xl hidden lg:block m-5">
        <Image
          src="/images/banner/login-banner-one.jpg"
          alt="Image"
          height={800}
          width={1200}
          quality={100}
          priority
          decoding="sync"
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="absolute inset-0 h-full w-full object-cover select-none pointer-events-none"
        />
      </div>
    </div>
  )
}
