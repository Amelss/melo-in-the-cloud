import React from 'react'
import _ from "lodash";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Image from "next/image";
import Link from 'next/link';

export default function BlogCard({blog}) {
  
  const { title, readTime, excerpt, tags, slug } = blog.fields


  const itemBackgroundColors = {
    Storage: "bg-yellow-200",
    Compute: "bg-pink-200",
    Networking: "bg-cyan-200",
    Security: "bg-blue-200",
    Data: "bg-green-200",
    Memory: "bg-orange-200",
    Training: "bg-red-200",
    Development: "bg-purple-200",
    'Cost Optimization': "bg-teal-200"
   

   
  };

  
  console.log(blog)
  return (
    <div className="max-w-sm rounded text-wrap shadow-lg">
      <Image
        src={`https:${blog.fields.thumbnail.fields.image.fields.file.url}`}
        alt={blog.fields.thumbnail.fields.altText}
        width={
          blog.fields.thumbnail.fields.image.fields.file.details.image.width
        }
        height={
          blog.fields.thumbnail.fields.image.fields.file.details.image.height
        }
        className="rounded-xl mx-auto"
      />
      <h1>{title}</h1>
      {readTime <= 1 ? (
        <p className="">Read Time: {readTime} min</p>
      ) : (
        <p className="">Read Time: {readTime} mins </p>
      )}
      <div>{documentToReactComponents(excerpt)}</div>

      <div className="flex text-wrap">
        {tags.map((item, index) => (
          <span
            key={index}
            className={`flex ml-1 px-2 py-1 rounded-lg text-xs ${
              itemBackgroundColors[item] || "bg-gray-200" // Default background color is gray if not specified
            } text-black`}
          >
            {item}
            {/* Add a space after each item except the last one */}
            {index !== tags.length - 1 && " "}
          </span>
        ))}
      </div>

      {/* <div>
        {tags.join("  ")}
      </div> */}

      <div>
        <Link href={`blogs/${slug}`}>
          <button>Read More</button>
        </Link>
      </div>
    </div>
  );
}
