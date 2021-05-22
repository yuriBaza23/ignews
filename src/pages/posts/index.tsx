import { GetStaticProps } from 'next';
import Head from 'next/head';
import { getPrismicClient } from '../../services/prismic';
import Prismic from '@prismicio/client';
import { RichText } from 'prismic-dom';

import styles from './posts.module.scss';
import Link from 'next/link';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

type Post = {
    slug: string;
    title: string;
    execerpt: string;
    updatedAt: string;
}

interface PostProps {
    posts: Post[]
}

export default function Posts({ posts }: PostProps) {
    return (
        <>
            <Head>
                <title>Posts | ig.news</title>
            </Head>
            
            <main className={styles.container}>
                <div className={styles.posts}>
                    { posts.map(post => (  
                        <Link key={post.slug} href={`/posts/${post.slug}`}>
                            <a>
                                <time>{post.updatedAt}</time>
                                <strong>{post.title}</strong>
                                <p>{post.execerpt}</p>
                            </a>
                        </Link>  
                    ))}
                </div>
            </main>
        </>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    const prismic = getPrismicClient()
    const response = await prismic.query([
            Prismic.Predicates.at('document.type', 'post')
        ], {
            fetch: ['post.title', 'post.content'],
            pageSize: 100
        }
    )

    const posts = response.results.map(post => {
        return {
            slug: post.uid,
            title: RichText.asText(post.data.title),
            execerpt: post.data.content.find((content: any) => content.type === 'paragraph')?.text ?? '',
            updatedAt: format(new Date(post.last_publication_date), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })
        }
    })

    return {
        props: {
            posts
        }
    }
}