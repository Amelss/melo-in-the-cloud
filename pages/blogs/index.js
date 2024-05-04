import React from 'react'
import BlogCard from '@/components/BlogCard'
import { createClient } from "contentful";
import Head from 'next/head';

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_KEY,
  previewToken: process.env.CONTENTFUL_PREVIEW_ACCESS_KEY,
});


export async function getStaticProps() {
    const res = await client.getEntries({
      content_type: "blogPost",
      order: "-sys.createdAt"
    });
  
  return {
    props: {blogs: res.items}
  }
}

export default function blogsHome({blogs}) {
console.log(blogs)


  return (
    <div>
      <Head>

      </Head>
      
      <div>
        {blogs.map((blog) => (
          <BlogCard key={blog.sys.id} blog={blog} />
        ))}
         
     </div>
 
    </div>
  )
}
