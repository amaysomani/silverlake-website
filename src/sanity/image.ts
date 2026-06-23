import { createImageUrlBuilder } from "@sanity/image-url";
import { client } from "./client";

const imageBuilder = createImageUrlBuilder({
  projectId: client.config().projectId || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  dataset: client.config().dataset || process.env.NEXT_PUBLIC_SANITY_DATASET || "production"
});

export const urlForImage = (source: any) => {
  return imageBuilder?.image(source).auto('format').fit('max');
};
