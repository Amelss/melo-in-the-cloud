import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function FeaturedBlogCard({ main }) {
  const { title, hero, heroAltText, featuredExcerpt, slug } = main.fields;
  console.log(main);

  return (
    <div>
      <div>
        <Link href={`/${process.env.NEXT_PUBLIC_BASE_PATH || ""}/${slug}`}>
          <div className="px-3 pb-10 relative">
            <Image
              src={`https:${hero.fields.file.url}`}
              alt={heroAltText}
              width={1366}
              height={768}
              className="rounded-3xl "
            />
            <div className="absolute bottom-14 px-3 backdrop-blur-2xl w-[340px] lg:w-[800px] xl:w-[1000px] 2xl:w-[1300px] ml-4 py-2 lg:py-8 rounded-xl border-2 border-white border-opacity-25">
              <h1 className="font-bold text-white text-xs">Featured</h1>
              <h1 className="font-bold text-white text-md lg:text-3xl pt-1 xl:py-3">
                {title}
              </h1>
              <p className="text-white text-xs lg:text-sm hidden lg:block">
                {featuredExcerpt}
              </p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
