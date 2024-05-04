import React from "react";
import _ from "lodash";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Image from "next/image";
import Link from "next/link";

export default function BlogCard({ blog }) {
  const { title, readTime, excerpt, tags, slug } = blog.fields;

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

  return (
      <div className="max-w-sm rounded px-3 mx-auto xl:px-0 xl:mx-0 card">
        <div className="">
          <Link href={`blogs/${slug}`}>
            <Image
              src={`https:${blog.fields.thumbnail.fields.image.fields.file.url}`}
              alt={blog.fields.thumbnail.fields.altText}
              width={400}
              height={400}
              className="rounded-xl mx-auto w-[400px] h-[350px]"
            />

            <h1 className="px-2 pt-3 text-xl">{title}</h1>
          </Link>

          <div className="px-2 text-xs text-gray-400 pt-2">
            {readTime <= 1 ? (
              <p className="">Read Time: {readTime} min</p>
            ) : (
              <p className="">Read Time: {readTime} mins </p>
            )}
          </div>

          <div className="px-2 py-2 text-sm">
            {documentToReactComponents(excerpt)}
          </div>

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

          <div className="py-3 px-2 text-sm font-bold">
            <Link href={`blogs/${slug}`}>
              <button>Read More</button>
            </Link>
          </div>
        </div>
      </div>
   
  );
}
