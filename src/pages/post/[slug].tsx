import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';

import { useRouter } from 'next/router';
import { FiCalendar, FiUser, FiClock } from 'react-icons/fi';
import { ptBR } from 'date-fns/locale';
import { format } from 'date-fns';
import { RichText } from 'prismic-dom';
import { getPrismicClient } from '../../services/prismic';

import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';

import Header from '../../components/Header/index';

interface Post {
  first_publication_date: string | null;
  data: {
    title: string;
    banner: {
      url: string;
    };
    author: string;
    content: {
      heading: string;
      body: {
        text: string;
      }[];
    }[];
  };
}

interface PostProps {
  post: Post;
}

export default function Post({ post }: PostProps): JSX.Element {
  const router = useRouter();

  if (router.isFallback) {
    return <h1>Carregando...</h1>;
  }

  const totalWords = post.data.content.reduce(
    (acc, el) => {
      const headingWords = el.heading.split(/[,.\s]/).length;
      const bodyWords = RichText.asText(el.body).split(/[,.\s]/).length;

      acc.total += Number(headingWords) + bodyWords;

      return acc;
    },
    { total: 0 }
  );

  return (
    <>
      <Head>
        <title>Spacetravelling | {post.data.title}</title>
      </Head>

      <Header />

      <main className={styles.main}>
        <img src={post.data.banner.url} alt="Banner img" />
        <article className={commonStyles.container}>
          <strong className={commonStyles.heading}>{post.data.title}</strong>
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
            <span className={commonStyles.infos}>
              <FiClock />
              {Math.ceil(totalWords.total / 200)} min
            </span>
          </div>
          <section className={styles.content}>
            {post.data.content.map(content => (
              <div key={content.heading}>
                <h2 className={commonStyles.heading}>{content.heading}</h2>
                <div
                  // eslint-disable-next-line react/no-danger
                  dangerouslySetInnerHTML={{
                    __html: RichText.asHtml(content.body),
                  }}
                />
              </div>
            ))}
          </section>
        </article>
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const prismic = getPrismicClient({});
  const posts = await prismic.getByType('posts');

  const slugs = posts.results.map(post => {
    return {
      params: { slug: post.uid },
    };
  });

  return {
    paths: [...slugs],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const prismic = getPrismicClient({});
  const { slug } = params;
  const response = await prismic.getByUID('posts', String(slug));

  const post = {
    uid: response.uid,
    first_publication_date: response.first_publication_date,
    data: {
      subtitle: response.data.subtitle,
      title: response.data.title,
      banner: {
        url: response.data.banner.url,
      },
      author: response.data.author,
      content: response.data.content.map(content => {
        return {
          heading: content.heading,
          body: content.body,
        };
      }),
    },
  };

  return {
    props: {
      post,
    },
    revalidate: 60 * 30,
  };
};
