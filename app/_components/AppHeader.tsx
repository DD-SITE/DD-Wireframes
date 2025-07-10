import { SidebarTrigger } from '@/components/ui/sidebar'
import React from 'react'
import ProfileAvatar from './ProfileAvatar'
import Image from 'next/image'

function AppHeader({ hideSidebar = false }) {
    return (
        <div className='p-4 shadow-sm flex items-center justify-between w-full '>
            {!hideSidebar ? <SidebarTrigger /> :
                <div className='flex items-center gap-2'>
                    <Image src={'/logo.svg'} alt='logo' width={120} height={120}
                        className='w-[40px] h-[40px]' />
                   
                </div>
            }
            <ProfileAvatar />
        </div>
    )
}

export default AppHeader