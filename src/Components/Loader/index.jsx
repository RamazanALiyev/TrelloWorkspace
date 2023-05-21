import React from 'react';
import { Watch } from 'react-loader-spinner';

const Index = () => {
    return (
        <div className='z-50 absolute top-0 left-0 w-full h-full overflow-hidden'>
            <div className='fixed top-0 left-0 opacity-80 w-full h-screen bg-slate-800 overflow-hidden' />
            <div className='absolute top-0 left-0 w-full h-full flex items-center justify-center overflow-hidden'>
                <Watch
                    height="80"
                    width="80"
                    radius="48"
                    color="#4fa94d"
                    ariaLabel="watch-loading"
                    wrapperStyle={{}}
                    wrapperClassName=""
                    visible={true}
                />
            </div>
        </div>
    )
}

export default Index