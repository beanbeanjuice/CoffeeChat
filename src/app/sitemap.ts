import type { MetadataRoute } from 'next';
import { headers } from 'next/headers';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    await headers();

    const baseUrl = (process.env.PUBLIC_URL ?? '').replace(/\/$/, '');

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 1,
        },
    ];
}
