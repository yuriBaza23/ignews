import { GetServerSideProps } from "next"
import { getPrismicClient } from '../../services/prismic';
import { RichText } from 'prismic-dom';
import { getSession } from "next-auth/client";
import Head from "next/head";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import styles from './post.module.scss';

interface PostProps {
    post: {
        slug: string;
        title: string;
        content: string;
        updatedAt: string;
    }
}

export default function Post({ post }: PostProps) {
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
                        className={styles.postContent}
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />
                </article>
            </main>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
    const session = await getSession({ req })
    const { slug } = params;

    if(!session?.activeSubscription) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    const prismic = getPrismicClient(req)
    const response = await prismic.getByUID('post', String(slug), {})
    
    const post = {
        slug: response.uid,
        title: RichText.asText(response.data.title),
        content: RichText.asHtml(response.data.content),
        updatedAt: format(new Date(response.last_publication_date), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })
    }

    return {
        props: {
            post
        }
    }
}