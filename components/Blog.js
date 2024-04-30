import _ from "lodash";
import * as contentful from "contentful";
import { getEntriesByContentType } from "@/lib/helpers";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Head from "next/head";
import { BLOCKS, MARKS } from "@contentful/rich-text-types";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";

export default function Blog(props) {
console.log("static props", props);
const blogPost = _.get(props, "blogPost.items[0]");
const contentType = _.get(blogPost, "sys.contentType.id");
const fields = _.get(blogPost, "fields");
const title = _.get(blogPost, "fields.title");
const hero = _.get(blogPost, "fields.hero");
const heroAltText = _.get(blogPost, "fields.heroAltText");
const thumbnail = _.get(blogPost, "fields.thumbnail");
const author = _.get(blogPost, "fields.author");
const readTime = _.get(blogPost, "fields.readTime");
const datePublished = _.get(blogPost, "fields.datePublished");
const category = _.get(blogPost, "fields.category");
const excerpt = _.get(blogPost, "fields.excerpt");
const blogSections = _.get(blogPost, "fields.blogSections");
const relatedArticles = _.get(blogPost, "fields.relatedArticles");
const tags = _.get(blogPost, "fields.tags");
   
console.log(blogPost);



    return (
        <div>
            
        <h1>Separate blogggg</h1>
        <h1>{title}</h1>
        {Array.isArray(blogSections)
          ? blogSections.map((blogSection, blogSectionIndex) => {
              const contentType = _.get(blogSection, "sys.contentType.sys.id");
              const sectionId = _.get(blogSection, "sys.id");
              const fields = _.get(blogSection, "fields");
              return (
                <div
                  key={sectionId}
                  blogSectionIndex={blogSectionIndex}
                  id={sectionId}
                  fields={fields}
                />
              );
            })
          : " "}

        
      </div>
    );
}

export async function getStaticPaths() {
  const blogEntries = await getEntriesByContentType("blogPost");

  let paths = [];
  if (blogEntries) {
    try {
      paths = blogEntries.items.map((entry) => {
        const slugVal = _.get(entry, "fields.slug");
        return { params: { slug: slugVal } };
      });
    } catch (error) {}
  }

  return {
    paths: paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const slug = _.get(context, "params.slug");
  const blogPost = await getEntriesByContentType("blogPost", slug);

  return {
    props: { blogPost },
  };
}

