import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Content Creation Services | Areion",
  description: "Professional content creation services including blog posts, social media content, email newsletters, video scripts, website copy, and whitepapers to engage your audience and drive results.",
  keywords: "content creation, blog posts, social media content, email newsletters, video scripts, website copy, whitepapers, content marketing",
  openGraph: {
    title: "Content Creation Services | Areion",
    description: "Engaging, high-quality content that resonates with your audience and drives measurable business results.",
    url: "https://areion.biz/services/content-creation",
    images: [
      {
        url: "/assets/img/content-creation-og.jpg",
        width: 1200,
        height: 630,
        alt: "Areion Content Creation Services",
      },
    ],
  },
  alternates: {
    canonical: "https://areion.biz/services/content-creation",
  },
};
