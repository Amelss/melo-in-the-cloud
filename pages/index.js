import { createClient } from "contentful";
import BlogCard from "@/components/BlogCard";
import Head from "next/head";
import Image from "next/image";
import FeaturedBlogCard from "@/components/FeaturedBlogCard";
import Link from "next/link";

const client = createClient({
  accessToken: process.env.CONTENTFUL_ACCESS_KEY,
  space: process.env.CONTENTFUL_SPACE_ID,
  previewToken: process.env.CONTENTFUL_PREVIEW_ACCESS_KEY,
});

export async function getStaticProps() {
  const res = await client.getEntries({
    content_type: "blogPost",
    order: "-sys.createdAt",
  });
 
  const allBlogPosts = await client.getEntries({
    content_type: "blogPost",
    order: "-sys.createdAt",
  });

  return {
    props: {
      mainBlog: res.items,
      allBlogs: allBlogPosts.items
    },
  };
}

export default function Home({mainBlog, allBlogs}) {
  return (
    <main>
      {mainBlog.slice(0, 1).map((main) => (
        <FeaturedBlogCard key={main.sys.id} main={main} />
      ))}
      <div className="flex justify-between items-center px-5 pb-5">
        <h1 className="font-bold text-sm">Recent Blog Posts</h1>
         <div className=" ">
        <Link href={"/blogs"}>
          <button className="bg-blue-100 text-blue-500 py-1 px-3 rounded-lg text-xs font-bold">View All</button>
        </Link>
      </div>
      </div>
     
      <div className="grid grid-cols-1 lg:grid-cols-3 2xl:grid-cols-4 gap-y-5 gap-x-2 mx-auto">
        {allBlogs.map((allBlog) => (
          <BlogCard key={allBlog.sys.id} blog={allBlog} />
        ))}
      </div>
    </main>
  );
}
