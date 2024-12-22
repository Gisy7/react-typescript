import React from 'react'
import { Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <>
            <header className='bg-slate-800 py-7'>
                <div className='w-2/3 m-auto'>
                    <h1 className='text-white font-bold text-3xl'>Administrados de Productos</h1>
                </div>
            </header>

            <main className='w-2/3 m-auto py-10'>
                <Outlet />
            </main>


        </>

    )
}

export default Layout