import React from 'react'

const Loader = () => {
    return (


        // skeleton card loader
        <div className="shadow-md animate-pulse rounded overflow-hidden">
            <div className="h-64 bg-gray-300 w-full"></div>
            <div className="p-4 space-y-2">
                <div className="h-6 bg-gray-300 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
        </div>
        ////

        // Spinner loader
        // <div className="flex justify-center items-center py-10">
        //     <div className="w-10 h-10 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
        // </div>
        ////
    )
}

export default Loader
