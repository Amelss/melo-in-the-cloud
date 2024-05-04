import { createClient } from "contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Head from "next/head";
import Image from "next/image";
import { useState, useEffect } from "react";
import BlogCard from "@/components/BlogCard";




const client = createClient({
  accessToken: process.env.CONTENTFUL_ACCESS_KEY,
  space: process.env.CONTENTFUL_SPACE_ID,
  previewToken: process.env.CONTENTFUL_PREVIEW_ACCESS_KEY,
});

export async function getStaticPaths() {
  const entries = await client.getEntries({
    content_type: "blogPost",
  });

  const paths = entries.items.map((entry) => ({
    params: { slug: entry.fields.slug },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  try {
    const entries = await client.getEntries({
      content_type: "blogPost",
      "fields.slug": params.slug,
      include: 10,
    });

    const blogPost = entries.items[0];
 
   

    const allBlogEntries = await client.getEntries({
      content_type: "blogPost",
    });

    const otherBlogPosts = allBlogEntries.items.filter(
      (item) => item.sys.id !== blogPost.sys.id
    );

    const referenceFields = Object.keys(blogPost.fields).filter((key) => {
      return (
        blogPost.fields[key].sys && blogPost.fields[key].sys.type === "Link"
      );
    });

    const referencedEntries = await Promise.all(
      referenceFields.map(async (fieldKey) => {
        const references = blogPost.fields[fieldKey];
        const referencedEntries = await Promise.all(
          references.map(async (reference) => {
            const referencedEntry = await client.getEntry(reference.sys.id);
            return {
              type: referencedEntry.sys.contentType.sys.id,
              entry: referencedEntry,
            };
          })
        );
        return {
          fieldKey,
          referencedEntries,
        };
      })
    );

    return {
      props: {
        blogPost,
        referencedEntries,
        otherBlogPosts,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        error: "Error fetching data",
      },
    };
  }
}



export default function blogPosts({ blogPost, otherBlogPosts }) {
  if (!blogPost || !blogPost.fields) {
    return <div>Error: Blog post not found</div>;
  }
  // console.log(blogPost);
  // console.log(otherBlogPosts)
  
const {
    title,
    readTime,
    author,
    hero,
    datePublished,
    category,
    heroAltText,
} = blogPost.fields;
  
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
      })
      .catch((error) => console.error("Failed to copy:", error));
  };

  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "short", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-GB", options);
  };

  
  return (
    <div>
      <Head>
        <title>{`${title}`}</title>
        <meta
          name="description"
          content="A blog by Ameley and her cloud journey"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.png" />
      </Head>
      <div className="px-5 my-3">
        <h1 className="text-center text-3xl font-bold py-6">
          {blogPost.fields.title}
        </h1>
        <div className="">
          <Image
            src={`https:${hero.fields.file.url}`}
            alt={heroAltText}
            width={hero.fields.file.details.image.width}
            height={hero.fields.file.details.image.height}
            className="rounded-xl mx-auto"
          />
        </div>
        <div className="py-3">
          <div className="xl:max-w-96 xl:pl-36 text-lg">
            <h3>{author}</h3>
          </div>

          <div className="flex justify-between  xl:max-w-[500px] text-xs py-3 text-gray-500 xl:pl-36">
            {readTime <= 1 ? (
              <p className="">Read Time: {readTime} min</p>
            ) : (
              <p className="">Read Time: {readTime} mins </p>
            )}
            <p>{formatDate(datePublished)}</p>
            <p className="">Category: {category}</p>
          </div>
        </div>
        <hr className="xl:w-[800px] mx-auto" />
      </div>
      <div>
        {blogPost.fields.blogSections.map((section, index) => (
          <div key={index}>
            {section.sys.contentType.sys.id === "image" &&
            section.fields.image.fields.file ? (
              <div className="py-3 px-5 xl:px-0">
                <Image
                  src={`https:${section.fields.image.fields.file.url}`}
                  alt={section.fields.altText}
                  width={section.fields.image.fields.file.details.image.width}
                  height={section.fields.image.fields.file.details.image.height}
                  className=" mx-auto rounded-lg"
                />
              </div>
            ) : section.sys.contentType.sys.id === "textBlock" ? (
              <div className="leading-relaxed px-5 py-3 xl:px-40">
                {documentToReactComponents(section.fields.textBlockText)}
              </div>
            ) : section.sys.contentType.sys.id === "codeBlock" ? (
              <div className="px-5 mx-auto">
                <pre className="relative px-6 py-14 my-7 bg-gray-200 text-black font-mono rounded-lg overflow-x-auto xl:max-w-[800px] mx-auto">
                  <div className="absolute top-0 left-0 w-full h-10 bg-gray-300 "></div>
                  <code className="whitespace-pre-wrap py-2 text-xs xl:text-base">
                    {section.fields.codeBlockCode}
                  </code>
                  <button
                    className="absolute top-2 right-2 px-2 py-1 mb-4 bg-blue-300 text-black text-sm rounded-md focus:outline-none"
                    onClick={() =>
                      copyToClipboard(section.fields.codeBlockCode)
                    }
                  >
                    {copied ? "Copied!" : "Copy"}
                  </button>
                </pre>
              </div>
            ) : null}
          </div>
        ))}
      </div>
      <div className="py-10 px-5 ">
        <h1 className="py-1 font-bold text-sm text-center bg-blue-100 text-blue-500 rounded-lg max-w-36 mx-auto">Discover More</h1>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-6 gap-y-4 px-5 xl:px-10 mx-auto max-w-[1000px] ">
        {otherBlogPosts.slice(0,3).map((otherBlog) => (
          <BlogCard key={otherBlog.sys.id} blog={otherBlog} />
        ))}
      </div>
    </div>
  );
}
