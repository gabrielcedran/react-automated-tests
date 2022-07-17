import { GetStaticPaths, GetStaticProps } from "next";
import { getSession, useSession } from "next-auth/react";
import { getPrismicClient } from "../../../services/prismic";
import * as prismicH from '@prismicio/helpers';
import Head from "next/head";
import styles from '../post.module.scss';
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/router";

type PostPreviewProps = {
    post: {
        slug: string;
        title: string;
        content: string;
        updatedAt: string;
    }
}

export default function PostPreview({post}: PostPreviewProps) {
    const {data: session} = useSession()
    const router = useRouter()

    useEffect(() => {
        if (session?.activeSubscription) {
            router.push(`/posts/${post.slug}`)
        }
    }, [session])

    return (
        <>
           <Head>
               <title>{post.title} | ignews</title>
            </Head>
            <main className={styles.container}>
                <article className={styles.post}>
                    <h1>{post.title}</h1>
                    <time>{post.updatedAt}</time>
                    <div className={`${styles.postContent} ${styles.previewContent}`} dangerouslySetInnerHTML={{ __html: post.content}}></div>
                    <div className={styles.continueReading}>Wanna continue reading? <Link href='/'><a>Subscribe now</a></Link> 🤗</div>
                </article>
            </main>
        </>
        
    );
}

export const getStaticPaths: GetStaticPaths = async () => {
    // could have access to external apis and dbs
    return {
        paths: [],
        fallback: 'blocking' // it accepts:
        // true - if the page has not been generated yet, partially loads the page and performs the request to the server in real time (mostly processing on the client side) - causes layout shift and is not good for SEOs
        // false - if the page has not been generated yet, renders a 404
        // blocking - if the page has not been generated yet, waits for the server side generation before rendering anything
    }
}

export const getStaticProps: GetStaticProps  = async ({params}) => {

    const prismic = getPrismicClient()

    const { slug } = params;
    
    const response = await prismic.getByUID('post', String(slug), {});

    const post = {
        slug,
        title: prismicH.asText(response.data.title),
        content: prismicH.asHTML(response.data.content.splice(0, 3)),
        updatedAt: new Date(response.last_publication_date).toLocaleDateString('pt-BR', {
            day: "2-digit",
            month: "long",
            year: "numeric"
        })
    }
    return {
        props: {
            post
        },
        revalidate: 60 * 30 
    }
}