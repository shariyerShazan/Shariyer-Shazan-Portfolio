import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Shariyer Shazan | Backend Engineer & Systems Architect",
    short_name: "Shariyer Shazan",
    description: "Senior portfolio of Md Shariyer Shazan, Backend Engineer specializing in NestJS, Kafka, gRPC, and Microservices.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0f1d",
    theme_color: "#00f0ff",
    icons: [
      {
        src: "/profile.jpg",
        sizes: "192x192",
        type: "image/jpeg",
      },
      {
        src: "/profile.jpg",
        sizes: "512x512",
        type: "image/jpeg",
      },
    ],
  };
}
