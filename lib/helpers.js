import * as contentful from "contentful"
import _ from "lodash"


const space = process.env.CONTENTFUL_SPACE_ID;
const access_token = process.env.CONTENTFUL_ACCESS_KEY;
const preview_token = process.env.CONTENTFUL_PREVIEW_ACCESS_KEY;

const getOptions = (is_preview) => {
  let options = {};
  options.space = space;
  options.host = is_preview ? "preview.contentful" : undefined;
  options.accessToken = is_preview ? preview_token : access_token;
  options.resolveLinks = true;

  return options;
};

export const getEntriesByContentType = async (content_type, slug = null) => {
  const options = getOptions(false);

  try {
    const contentfulClient = contentful.createClient(options); 
    if (contentfulClient) {
      let params = { content_type: content_type, include: 5 }; 

      if (slug) {
        params["fields.slug"] = slug;
      }

      let entries = await contentfulClient.getEntries(params); 

      const items = _.get(entries, "items");

      return { items };
    } else {
      return false;
    }
  } catch (error) {
    console.log("any errors? ->", error);
    return false;
  }
};