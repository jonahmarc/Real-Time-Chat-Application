import React from 'react'

export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className='w-full h-full flex flex-col items-center'>
            <main className="flex flex-col flex-grow items-center justify-center
                w-full lg:w-[1200px]
                px-5 lg:px-0">
                    { children }
            </main>
        </div>
    )
}
