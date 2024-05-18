import React from "react";
import _ from "lodash";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Image from "next/image";
import Link from "next/link";

export default function BlogCard({ blog }) {
   if (!blog || !blog.fields) {
     return null; 
   }

   const { title, readTime, excerpt, tags, slug, thumbnail, datePublished } = blog.fields;

   
   const thumbnailUrl = thumbnail?.fields?.image?.fields?.file?.url || "";
   const thumbnailAltText = thumbnail?.fields?.altText || "";

  const itemBackgroundColors = {
    Storage: "bg-yellow-200",
    Compute: "bg-pink-200",
    Networking: "bg-cyan-200",
    Security: "bg-blue-200",
    Data: "bg-green-200",
    Memory: "bg-orange-200",
    Training: "bg-red-200",
    Development: "bg-purple-200",
    "Cost Optimization": "bg-teal-200",
  };

  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "short", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-GB", options);
  };
  return (
    <div className="rounded px-3 mx-auto xl:px-0 xl:mx-0 max-w-xs card relative">
      <div className="">
        <Link href={`/${process.env.NEXT_PUBLIC_BASE_PATH || ""}/${slug}`}>
          <Image
            src={`https:${blog.fields.thumbnail.fields.image.fields.file.url}`}
            alt={blog.fields.thumbnail.fields.altText}
            width={300}
            height={300}
            className="rounded-xl mx-auto xl:mx-0"
          />{" "}
        </Link>
        <div className="flex space-between items-center pt-3">
          <div>
            <Link
              href={`/${process.env.NEXT_PUBLIC_BASE_PATH || ""}/${slug}`}
            >
                <h1 className="px-2 text-md font-bold text-balance">{title}</h1>
            </Link>
          
          </div>

          <div className="absolute right-5">
            <Link href={`/${process.env.NEXT_PUBLIC_BASE_PATH || ""}/${slug}`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
                />
              </svg>
            </Link>
          </div>
        </div>

        <div className="px-2 text-xs text-gray-400 pt-2">
          {readTime <= 1 ? (
            <p className="">Read Time: {readTime} min</p>
          ) : (
            <p className="">Read Time: {readTime} mins </p>
          )}
        </div>

        <div className="px-2 py-2 text-xs">
          {documentToReactComponents(excerpt)}
        </div>
        <p className="text-xs pt-1 pb-2 px-2 text-gray-400">
          {formatDate(datePublished)}
        </p>
        <div className="flex text-wrap">
          {tags.map((item, index) => (
            <span
              key={index}
              className={`flex ml-1 px-2 py-1 rounded-lg text-xs ${
                itemBackgroundColors[item] || "bg-gray-200"
              } text-black`}
            >
              {item}

              {index !== tags.length - 1 && " "}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
