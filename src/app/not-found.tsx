"use client"

import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function NotFound() {
  const router = useRouter()
  const handleBack = () => {
    if (window.history.length > 1) {
      router.back()
    } else {
      router.push('/')
    }
  }

  return (
    <div className='relative h-screen flex flex-col justify-center items-center'>
      <div className='relative overflow-hidden h-[400px] w-[400px] '>
        <Image
          src="/images/error/not-found.png"
          alt='404 Not Found'
          height={800}
          width={800}
          loading='eager'
          className='w-full h-full object-contain select-none pointer-events-none' />
      </div>
      <div className='relative max-w-lg text-center space-y-2'>
        <h2 className='text-lg font-bold uppercase -tracking-wider'>404 Not Found</h2>
        <p className='text-xs md:text-base leading-tight'>The page you are looking for does not exist.</p>
        <Button variant="default" className='mt-5' onClick={handleBack}>Return Back</Button>
      </div>
    </div>
  )
}