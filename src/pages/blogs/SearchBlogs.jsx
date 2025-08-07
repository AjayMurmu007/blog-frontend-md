import React from 'react'

const SearchBlogs = ({ search, handleSearchChange, handleSearch }) => {

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    }

    return (
        <div className='w-full flex'>
            <input type="text" value={search} onChange={handleSearchChange} onKeyPress={handleKeyPress} placeholder="Search blogs..." className='py-2 px-4 mr-5 w-full bg-[#f7f8f9] focus:outline-none focus:border' />
            <button onClick={handleSearch} className='bg-[#1E73BE] text-white rounded-r-md px-4 py-2'>Search</button>
        </div>
    )
}

export default SearchBlogs
