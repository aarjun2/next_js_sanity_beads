import { createClient, groq } from "next-sanity";

export async function getProducts() {
    const client = createClient({
        projectId: 'kssnf3nz',
        dataset: 'production',
        apiVersion: '2021-10-21',
        useCdn: false
    });

    return client.fetch(
        groq`*[_type == 'product']{
            _id,
            _createdAt,
            name,
            "slug":slug.current,
            price,
            details,
            category,
            "image": image[].asset->url
        }`
    )

}