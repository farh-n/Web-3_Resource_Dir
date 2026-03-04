import type { MetadataRoute } from "next";
import resources from '@/data/resources.json'
import paths from '@/data/paths.json';

const BASE_URL=''

export default function sitemap():MetadataRoute.Sitemap{
  const staticPages:MetadataRoute.Sitemap=[
    {
      url: BASE_URL,
      lastModified:new Date(),
      changeFrequency:"monthly",
      priority:1
    },
    {
      url: `${BASE_URL}/explore`,
      lastModified:new Date(),
      changeFrequency:"weekly",
      priority:0.9
    },
    {
      url: `${BASE_URL}/paths`,
      lastModified:new Date(),
      changeFrequency:"monthly",
      priority:0.8
    },
    {
      url:`${BASE_URL}/submit`,
      lastModified:new Date(),
      changeFrequency:"yearly",
      priority:0.5
    },
  ]

  const resourcePages: MetadataRoute.Sitemap= resources.map((resource) =>({
    url:`${BASE_URL}/explore/${resource.id}`,
    lastModified:new Date(resource.dateAdded),
    changeFrequency:'monthly',
    priority:0.7,
  }))


  return [...staticPages,...resourcePages]
}