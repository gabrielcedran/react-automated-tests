import * as prismic from '@prismicio/client';

export function getPrismicClient() {
    return prismic.createClient(
        'ignews-gcs', 
        {
            accessToken: process.env.PRISMIC_ACCESS_TOKEN
        }
    )
}