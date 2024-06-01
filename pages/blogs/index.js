import React from 'react'
import BlogCard from '@/components/BlogCard'
import { createClient } from "contentful";
import Head from 'next/head';
import * as contentful from "@/utils/contentful";


export async function getStaticProps() {
    const res = await contentful.client.getEntries({
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
      <Head>
        <title>Melo In The Cloud | View All Blogs</title>
        <meta name="description" content="View All" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

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
