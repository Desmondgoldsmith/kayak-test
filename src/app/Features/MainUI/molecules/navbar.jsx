import { ArrowRight2, Notification } from 'iconsax-react'
import React from 'react'
import Image from 'next/image'

const Navbar = () => {
  return (
    <div className='fixed left-0 right-0 top-0 z-40 flex justify-between items-center py-4 px-4 md:px-6 lg:px-12 border-b border-gray-200 bg-white'>
      <div className="flex items-center space-x-2">
        <p className='text-gray-500 text-sm'>Storage</p>
        <ArrowRight2 size="16" color="#71717A"/>
        <p className='text-sm text-gray-900'>New File</p>
      </div>
      <div className='flex items-center space-x-2'>
        <p className='text-[#5C5C5C] text-sm font-medium'>KayakTech</p>
          <Image src = "/assets/avatar.png" alt="avatar" width={30} height={30} className='object-cobtain h-[30px] w-[30px]  cursor-pointer'/>
          <Image src = "/assets/notif.png" alt="notif" width={30} height={30} className='object-cobtain h-[30px] w-[30px] cursor-pointer'/>
        </div>
      </div>
  )
}

export default Navbar