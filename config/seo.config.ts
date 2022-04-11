import { DefaultSeoProps } from "next-seo";

const titleTemplate = "Zero To Chad | %s";
const defaultTitle = "Zero To Chad | Self Improvement";

export const SEO: DefaultSeoProps = {
  defaultTitle,
  titleTemplate,
  openGraph: {
    type: "website",
    locale: "en_IE",
    url: "https://www.url.ie/",
    site_name: "Zero To Chad",
  },
  twitter: {
    handle: "@handle",
    site: "@site",
    cardType: "summary_large_image",
  },
};
