import { createClient } from "contentful";
import BlogCard from "@/components/BlogCard";
import Head from "next/head";
import Image from "next/image";
import FeaturedBlogCard from "@/components/FeaturedBlogCard";
import Link from "next/link";
import * as contentful from "@/utils/contentful";


export async function getStaticProps() {
  const res = await contentful.client.getEntries({
    content_type: "blogPost",
    order: "-sys.createdAt",
  });
 
  const allBlogPosts = await contentful.client.getEntries({
    content_type: "blogPost",
    order: "-sys.createdAt",
  });

  const home = await contentful.client.getEntries({
    content_type: "homepage",
    
  });

  return {
    props: {
      mainBlog: res.items,
      allBlogs: allBlogPosts.items,
      homepage: home.items
    },
  };
}

export default function Home({ mainBlog, allBlogs, homepage }) {

  return (
    <main className="mx-auto">
      
        {homepage.map((mainPage) => {
          <div key={mainPage.sys.id} mainPage={mainPage}>
            <Head>
            <title>Melo In The Cloud | Home</title>
            <meta
              name="description"
              content={`${mainPage.fields.seoPageDescription}`}
            />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <link rel="icon" href="/favicon.ico" />

             </Head>
          </div>;
        })}
         
     
     
      {mainBlog.slice(0, 1).map((main) => (
        <FeaturedBlogCard key={main.sys.id} main={main} />
      ))}
      <div className="flex justify-between items-center px-5 pb-5">
        <h1 className="font-bold text-sm">Recent Blog Posts</h1>
        <div className=" ">
          <Link href={"/blogs"}>
            <button className="bg-blue-100 text-blue-500 py-1 px-3 rounded-lg text-xs font-bold">
              View All
            </button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 2xl:grid-cols-3 gap-y-5 justify-items-center">
        {allBlogs.slice(0,6).map((allBlog) => (
          <BlogCard key={allBlog.sys.id} blog={allBlog} />
        ))}
      </div>
    </main>
  );
}
