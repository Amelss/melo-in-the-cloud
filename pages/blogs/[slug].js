import { createClient } from "contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Head from "next/head";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import Image from "next/image";


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
  // console.log(referencedEntries);
  // console.log(blogPost);

    const {title, readTime, author, hero, datePublished, category, heroAltText} = blogPost.fields

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
      <div className="my-3">
        <h1 className="text-center text-3xl font-bold py-6">
          {blogPost.fields.title}
        </h1>
        <div className="">
          <Image
            src={`https:${hero.fields.file.url}`}
            alt={heroAltText}
            width={600}
            height={600}
            className="rounded-xl mx-auto"
          />
        </div>
        <div className="">
          <div className="flex justify-between px-3 xl:max-w-96">
            <h3>{author}</h3>
            <p>{formatDate(datePublished)}</p>
          </div>
        </div>

        <div className="flex justify-between px-3 xl:max-w-96 text-xs font-bold py-3">
          {readTime <= 1 ? (
            <p className="">Read Time: {readTime} minute</p>
          ) : (
            <p className="">Read Time: {readTime} minutes </p>
          )}
           <p className="text-blue-300">Category: {category}</p>
        </div>

       
      </div>
      <div>
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
              <div className="px-4">
                <pre className="px-6 py-10 my-7 bg-gray-600 text-blue-300 font-mono rounded-lg overflow-x-auto  xl:w-[800px]">
                  <code className="whitespace-pre-wrap">
                    {documentToHtmlString(section.fields.codeBlockCode)}
                  </code>
                </pre>
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
