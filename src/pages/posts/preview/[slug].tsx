import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next"
import { getPrismicClient } from '../../../services/prismic';
import { RichText } from 'prismic-dom';
import Head from "next/head";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import styles from '../post.module.scss';
import Link from "next/link";
import { useSession } from "next-auth/client";
import { useEffect } from "react";
import { useRouter } from "next/dist/client/router";

interface PostPreviewProps {
    post: {
        slug: string;
        title: string;
        content: string;
        updatedAt: string;
    }
}

export default function PostPreview({ post }: PostPreviewProps) {
    const [session] = useSession();
    const router = useRouter();

    useEffect(() => {
        if(session?.activeSubscription) {
            router.push(`/posts/${post.slug}`)
        }
    }, [session])

    return(
        <>
            <Head>
                <title>{post.title} | ig.news</title>
            </Head>
            
            <main className={styles.container}>
                <article className={styles.post}>
                    <h1 className={styles.title}>{post.title}</h1>
                    <time>{post.updatedAt}</time>
                    <div 
                        className={`${styles.postContent} ${styles.previewContent}`}
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />

                    <div className={styles.continueReading}>
                        Wanna continue reading?
                        <Link href='/'>
                            <a>Subscribe now 🤗</a>
                        </Link>
                    </div>
                </article>
            </main>
        </>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: 'blocking'
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { slug } = params;

    const prismic = getPrismicClient()
    const response = await prismic.getByUID('post', String(slug), {})
    
    const post = {
        slug: response.uid,
        title: RichText.asText(response.data.title),
        content: RichText.asHtml(response.data.content.splice(0, 3)),
        updatedAt: format(new Date(response.last_publication_date), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })
    }

    return {
        props: {
            post
        },
        revalidate: 60 * 30 // 30 minutes
    }
}