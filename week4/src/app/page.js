import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

function page() {
  return (
    <div className='min-h-screen flex justify-center items-center '>
      <div className='flex flex-col items-center justify-center '>
      <h1 className='text-[20px] font-bold'>explore our Blogs</h1>
      <Link href='/blogs'>
      <Button>Button</Button>
      </Link>
      </div>
    </div>
  )
}

export default page
