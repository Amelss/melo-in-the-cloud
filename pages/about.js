import React from 'react'
import { createClient } from "contentful";
import Head from "next/head";
import Image from "next/image";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import * as contentful from "@/utils/contentful";


// const client = createClient({
//   accessToken: process.env.CONTENTFUL_ACCESS_KEY,
//   space: process.env.CONTENTFUL_SPACE_ID,
//   previewToken: process.env.CONTENTFUL_PREVIEW_ACCESS_KEY,
// });

export async function getStaticProps() {
  const aboutMe = await contentful.client.getEntries({
    content_type: "about"
  });



  return {
    props: {
      aboutMePage: aboutMe.items
    },
  };
}

export default function about({ aboutMePage }) {
  console.log(aboutMePage)
  return (
    <div>
     
      {aboutMePage.map((personal) => (
        <div key={personal.sys.id} personal={personal}>
          <Head>
            <title>{`${personal.fields.aboutTitle}`}</title>
            <meta
              name="description"
              content={`${personal.fields.seoAboutDescription}`}
            />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <link rel="icon" href="/favicon.ico" />
          </Head>

          <h1 className='text-center text-blue-300 font-bold text-3xl py-3 lg:pb-10 lg:mb-10'>About Me</h1>

          <div className='block px-8 '>
            <Image
              src={`https:${personal.fields.aboutHero.fields.file.url}`}
              alt={"picture of myself"}
              width={400}
              height={
                400
              }
              className="rounded-xl mx-auto"
            />
            <div className='lg:ml-10 py-10 text-center'>{documentToReactComponents(personal.fields.aboutSummary)}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
