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



  return (
    <div>
      <Head></Head>

      <div className="grid grid-cols-1 lg:grid-cols-3 2xl:grid-cols-4 gap-x-4 gap-y-10 ">
        {blogs.map((blog) => (
          <div>
            <BlogCard key={blog.sys.id} blog={blog} />
          </div>
        ))}
      </div>
    </div>
  );
}
