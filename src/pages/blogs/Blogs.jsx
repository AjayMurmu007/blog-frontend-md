import React from 'react'
import SearchBlogs from './SearchBlogs'
import { useFetchBlogsQuery } from '../../redux/features/blogs/blogsApi';
import { Link } from 'react-router-dom';
import Loader from '../../components/Loader';

const Blogs = () => {

  const [search, setSearch] = React.useState('');
  const [category, setCategory] = React.useState('');
  const [query, setQuery] = React.useState({ search: '', category: '' });
  const [visibleCount, setVisibleCount] = React.useState(8); // ✅ Step 1

  // get data from redux store
  const { data: blogs = [], isLoading, isError } = useFetchBlogsQuery(query);
  // if (isLoading) return <div>Loading...</div>;
  // if (isError) return <div>Error fetching blogs</div>;
  // console.log(blogs);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  }

  const handleSearch = (e) => {
    e.preventDefault();
    setQuery({ search, category });
    setVisibleCount(4); // reset to 5 on new search
  };

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 4); // ✅ Step 2
  };

  const visibleBlogs = blogs.slice(0, visibleCount); // ✅ Step 3


  return (
    <div className='mt-16 container mx-auto'>
      <SearchBlogs search={search} handleSearchChange={handleSearchChange} handleSearch={handleSearch} />


      {/* {isLoading && <div>Loading...</div>} */}
      {/* {isError && <div>Error fetching blogs</div>} */}

      <div className=' mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {
          isLoading ? Array(8).fill().map((_, i) => <Loader key={i} />) : blogs.length === 0 ? (
            <div className='col-span-4 text-center text-gray-500 text-lg'>No data found</div>
          ) : visibleBlogs.map(blog => (
            /* blogs.map(blog => ( */
            <Link key={blog._id} to={`/blogs/${blog._id}`} className='shadow-md'>
              <img src={blog.coverImg} alt={blog.title} className='h-80 object-fit w-full' />
              <h2 className='text-xl font-bold p-4'>{blog.title}</h2>
            </Link>
          ))
        }
      </div>
      

      {/* ✅ Step 4: Show Load More if more blogs exist */}
      {!isLoading && visibleCount < blogs.length && (
        <div className="mt-6 text-center">
          <button
            onClick={handleLoadMore}
            className="sparkle-button px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Load More
          </button>
        </div>
      )}

    </div>
  )
}

export default Blogs
