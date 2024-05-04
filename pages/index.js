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
      <h1 className="text-green-500">Hi</h1>
      {mainBlog.slice(0, 1).map((main) => (
        <FeaturedBlogCard key={main.sys.id} main={main} />
      ))}
      <div>
        <Link href={'/blogs'}> <button>
        View All
        </button></Link>
       
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-4">
         {allBlogs.map((allBlog) => (
        <BlogCard key={allBlog.sys.id} blog={ allBlog} />
      ))}
        </div>
     
    </main>
  );
}
