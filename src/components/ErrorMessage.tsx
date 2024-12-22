import React, { ReactNode } from 'react'

const ErrorMessage = ({ children }: { children: ReactNode }) => {
    return (
        <p className=' bg-red-700 text-white font-semibold uppercase p-3 text-center'>{children}</p>
    )
}

export default ErrorMessage