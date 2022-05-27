import { useState } from 'react';
import { GetStaticProps } from 'next';

import Head from 'next/head';
import Link from 'next/link';
import { FiUser, FiCalendar } from 'react-icons/fi';

import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { getPrismicClient } from '../services/prismic';

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

export default function Home({ postsPagination }: HomeProps): JSX.Element {
  const [posts, setPosts] = useState<Post[]>(postsPagination.results);
  const [nextPage, setNextPage] = useState(postsPagination.next_page);

  async function getNewPost(): Promise<void> {
    const newPostFetched = await fetch(nextPage)
      .then(res => res.json())
      .then(data => data);

    const newPost: Post[] = newPostFetched.results.map(post => {
      return {
        uid: post.uid,
        first_publication_date: format(
          new Date(post.first_publication_date),
          'dd LLL y',
          { locale: ptBR }
        ),
        data: {
          title: post.data.title,
          subtitle: post.data.subtitle,
          author: post.data.author,
        },
      };
    });

    setPosts(previous => [...previous, ...newPost]);
    setNextPage(newPostFetched.next_page);
  }

  return (
    <>
      <Head>
        <title>spacetravelling</title>
      </Head>

      <main className={`${commonStyles.container} ${styles.content}`}>
        <Link href="home">
          <img src="/logo.svg" alt="logo" />
        </Link>
        <section>
          {posts.map(post => (
            <Link key={post.uid} href={`/post/${post.uid}`}>
              <a>
                <strong className={commonStyles.heading}>
                  {post.data.title}
                </strong>
                <p className={commonStyles.paragraph}>{post.data.subtitle}</p>
                <div>
                  <time className={commonStyles.infos}>
                    <FiCalendar />
                    {format(new Date(post.first_publication_date), 'dd LLL y', {
                      locale: ptBR,
                    })}
                  </time>
                  <span className={commonStyles.infos}>
                    <FiUser />
                    {post.data.author}
                  </span>
                </div>
              </a>
            </Link>
          ))}
        </section>

        {nextPage && (
          <button type="button" onClick={() => getNewPost()}>
            Carregar mais posts
          </button>
        )}
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient({});
  const postsResponse = await prismic.getByType('posts', { pageSize: 1 });

  const postFetched = postsResponse.results.map(post => {
    return {
      uid: post.uid,
      first_publication_date: post.first_publication_date,
      data: {
        title: post.data.title,
        subtitle: post.data.subtitle,
        author: post.data.author,
      },
    };
  });

  return {
    props: {
      postsPagination: {
        next_page: postsResponse.next_page,
        results: postFetched,
      },
    },
  };
};
