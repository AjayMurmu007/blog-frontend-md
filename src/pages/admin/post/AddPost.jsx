import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import { usePostBlogMutation } from '../../../redux/features/blogs/blogsApi';
import { useNavigate } from 'react-router-dom';
import { Bounce, toast } from 'react-toastify';


const AddPost = () => {
  const editorRef = useRef(null);
  const [title, setTitle] = useState('');
  const [coverImg, setCoverImg] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState("");
  const [message, setMessage] = useState("");

  const [postBlog, { isLoading }] = usePostBlogMutation();

  const { user } = useSelector((state) => state.auth);
  // console.log(user.username);





  const [placeholder, setPlaceholder] = useState('');

  const placeholderText = 'Write  blog title here...!!';
  let typingSpeed = 100; // milliseconds per character

  // useEffect(() => {
  //   let i = 0;
  //   const interval = setInterval(() => {
  //     setPlaceholder(placeholderText.slice(0, i + 1));
  //     i++;
  //     if (i === placeholderText.length) {
  //       clearInterval(interval);
  //     }
  //   }, typingSpeed);

  //   return () => clearInterval(interval);
  // }, []);
  const pauseAfterTyping = 1000; // Pause before restarting (in ms)

  useEffect(() => {
    let i = 0;
    let timeoutId;

    const type = () => {
      if (i <= placeholderText.length) {
        setPlaceholder(placeholderText.slice(0, i));
        i++;
        timeoutId = setTimeout(type, typingSpeed);
      } else {
        // Pause, then restart typing
        setTimeout(() => {
          i = 0;
          type();
        }, pauseAfterTyping);
      }
    };

    type();

    return () => clearTimeout(timeoutId); // Cleanup
  }, []);

  useEffect(() => {
    const editor = new EditorJS({
      holder: 'editorjs',
      onReady: () => {
        editorRef.current = editor;
      },
      autofocus: true,
      tools: {
        header: {
          class: Header,
          inlineToolbar: true,
        },
        list: {
          class: List,
          inlineToolbar: true,
        },
      }
    })

    return () => {
      editor.destroy();
      editorRef.current = null;
    }
  }, [])

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (rating < 1 || rating > 5) {
      setMessage("Rating must be between 1 and 5.");
      return;
    }

    try {
      const content = await editorRef.current.save();
      // console.log("content", content);
      const newPost = {
        title,
        coverImg,
        content,
        category,
        description: metaDescription,
        author: user?._id,
        rating
      }
      // console.log("newpost", newPost);
      const response = await postBlog(newPost).unwrap();
      // console.log("response", response);
      // alert("Blog post successfully..!")
      toast.success('Blog post successfully..!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      navigate("/")



    } catch (error) {
      // console.log("Failed to submit post", error)
      setMessage("Failed to submit post..!")
    }
  }

  return (
    <div className='bg-white md:p-8 p-2'>
      <h2 className='text-2xl font-semibold'>Create a new blog post</h2>
      <form onSubmit={handleSubmit} className='space-y-5 pt-8'>
        <div>
          <label className='font-semibold text-xl'>Blog Title</label>
          <input
            className='w-full inline-block bg-bgPrimary focus:outline-none px-5 py-3'
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            type='text' placeholder={placeholder} required />
        </div>

        {/* blog details */}
        <div className='flex flex-col md:flex-row justify-between items-start gap-4'>
          {/* left side */}
          <div className='md:w-2/3 w-full'>

            <p className='font-semibold text-xl mb-5'>Content Section</p>
            <p className='text-xs italic'>Write your post below here..!</p>
            <div id='editorjs' className="bg-bgPrimary min-h-[530px] border rounded-md p-4 mt-4" ></div>
          </div>

          {/* right side */}
          <div className='md:w-1/3 w-full border p-5 space-y-5'>
            <p className='text-xl font-semibold'>Choose Blog Format</p>

            {/* images */}
            <div>
              <label className='font-semibold'>Blog Cover</label>
              <input
                className='w-full inline-block bg-bgPrimary focus:outline-none px-5 py-3'
                onChange={(e) => setCoverImg(e.target.value)}
                value={coverImg}
                type='text' placeholder={"Enter cover image URL"} required />
            </div>

            {/* Category */}
            <div>
              <label className='font-semibold'> Category: </label>
              <input
                className='w-full inline-block bg-bgPrimary focus:outline-none px-5 py-3'
                onChange={(e) => setCategory(e.target.value)}
                value={category}
                type='text' placeholder={"Enter blog category"} required />
            </div>

            {/* meta description */}
            <div>
              <label className='font-semibold'>meta description:</label>
              <textarea
                cols={4}
                rows={4}
                className='w-full inline-block bg-bgPrimary focus:outline-none px-5 py-3'
                onChange={(e) => setMetaDescription(e.target.value)}
                value={metaDescription}
                type='text' placeholder={"Write meta description"} required />
            </div>

            {/* rating */}
            <div>
              <label className='font-semibold'> Rating:</label>
              <input
                className='w-full inline-block bg-bgPrimary focus:outline-none px-5 py-3'
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                type='number' placeholder={"Enter rating (1-5)"} required />
            </div>

            {/* Author */}
            <div>
              <label className='font-semibold'> Author:</label>
              <input
                className='w-full inline-block bg-bgPrimary focus:outline-none px-5 py-3'
                value={user.username}
                type='text' placeholder={`{user.username} (not editable)`} required disabled />
            </div>


          </div>
        </div>

        {
          message && <p className="text-red-500">{message}</p>
        }

        <button type='submit' disabled={isLoading} className='w-full mt-5 bg-primary hover:bg-indigo-500 text-white font-medium py-3 rounded-md'>Add New Blog</button>

      </form>
    </div>
  )
}

export default AddPost
