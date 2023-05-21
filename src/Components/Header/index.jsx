import React from 'react';
import { BsInbox } from 'react-icons/bs'

const Index = () => {
    return (
        <div className='bg-sky-800 h-16 flex items-center justify-center'>
            <ul className='flex items-center justify-center'>
                <li className='text-white flex items-center mx-8 cursor-pointer'><BsInbox className='mr-2'/><span>Backlock</span></li>
                <li className='text-white flex items-center mx-8 cursor-pointer'><BsInbox className='mr-2'/><span>Board</span></li>
                <li className='text-white flex items-center mx-8 cursor-pointer'><BsInbox className='mr-2'/><span>Feed</span></li>
                <li className='text-white flex items-center mx-8 cursor-pointer'><BsInbox className='mr-2'/><span>Reports</span></li>
            </ul>
        </div>
    )
}
export default Index;