import React from 'react'

const CommentLoader = () => {
    return (
        <div className="space-y-4">
            {Array(3).fill().map((_, i) => (
                <div key={i} className="p-4 border rounded animate-pulse space-y-2">
                    <div className="h-4 bg-gray-300 w-1/2 rounded"></div>
                    <div className="h-3 bg-gray-200 w-5/6 rounded"></div>
                </div>
            ))}
        </div>
    )
}

export default CommentLoader
