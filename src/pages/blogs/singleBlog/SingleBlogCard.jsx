import React from 'react'
import formatDate from '../../../utils/formatDate';
import EditorJSHTML from 'editorjs-html';

const editorJSHTML = EditorJSHTML();

const SingleBlogCard = ({ blog }) => {

    const { title, description, coverImg, content, category, rating, author, createdAt } = blog || {};

    // console.log("EditorJS Content:", content);
    // console.log("EditorJS author:", author);

    // const htmlContent = editorJSHTML.parse(content).join('');
    let htmlContent = '';
    const parsed = editorJSHTML.parse(content);

    if (Array.isArray(parsed)) {
        htmlContent = parsed.join('');
    } else if (typeof parsed === 'string') {
        htmlContent = parsed;
    } else {
        // console.warn('editorJSHTML.parse() ka unexpected output:', parsed);
    }


    return (
        <>
            <div className='bg-white p-8 '>
                {/* blog header */}
                <div className=''>
                    <h1 className='md:text-4xl text-3xl font-medium mb-4'>{title}</h1>
                    <p className='mb-6'>{formatDate(createdAt)} by <span className='text-blue-400 cursor-pointer'>{author ?.username}</span></p>
                </div>

                <div>
                    <img src={coverImg} alt={title} className='w-full md:h-[520px] bg-cover' />
                </div>

                {/* blogs details */}
                <div className='mt-8 space-y-4'>
                    <div dangerouslySetInnerHTML={{ __html: htmlContent }} className='space-y-3 editorjsdiv' />

                    <div>
                        <span className='text-xl font-medium text-gray-500'>Rating: </span>
                        <span className='text-gray-700'>{rating} (based on 2,437 reviews)</span>
                    </div>

                </div>

            </div>
        </>
    )
}

export default SingleBlogCard
