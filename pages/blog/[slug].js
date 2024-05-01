import { createClient } from "contentful";
import { getEntriesByContentType } from "@/lib/helpers";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Head from "next/head";
import { BLOCKS, MARKS } from "@contentful/rich-text-types";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import Image from "next/image";
import { useState } from "react";


const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_KEY,
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



export default function blogPosts({ blogPost, referencedEntries }) {
  console.log(referencedEntries);
  console.log(blogPost);

    
    
  return (
    <div>
      <h1>{blogPost.fields.title}</h1>

      {blogPost.fields.blogSections.map((section, index) => (
        <div key={index}>
          {section.sys.contentType.sys.id === "image" &&
          section.fields.image.fields.file ? (
            <Image
              src={`https:${section.fields.image.fields.file.url}`}
              alt={section.fields.altText}
              width={300}
              height={300}
            />
          ) : section.sys.contentType.sys.id === "textBlock" ? (
                      documentToReactComponents(section.fields.textBlockText)
                      
          ) : section.sys.contentType.sys.id === "codeBlock" ? (
                    <pre className="px-6 py-10 my-7 bg-gray-600 text-blue-300 font-mono rounded-lg text-pretty w-[800px]">
                              <div className="">
                                  {documentToHtmlString(section.fields.codeBlockCode)}
                              </div>
                    </pre>
                
          ) : null}
        </div>
      ))}
    </div>
  );
}
