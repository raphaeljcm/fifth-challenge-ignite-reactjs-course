import { GetStaticProps } from 'next';

import Head from 'next/head';
import Link from 'next/link';
import { FiUser, FiCalendar } from 'react-icons/fi';

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

export default function Home(): JSX.Element {
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
          <Link href="luga">
            <a>
              <strong className={commonStyles.heading}>Como utilizar Hooks</strong>
              <p className={commonStyles.paragraph}>
                Pensando em sincronização em vez de ciclos de vida.
              </p>
              <div>
                <time className={commonStyles.infos}>
                  <FiCalendar />
                  15 Mar 2021
                </time>
                <span className={commonStyles.infos}>
                  <FiUser />
                  Raphael Marques
                </span>
              </div>
            </a>
          </Link>
          <Link href="luga">
            <a>
              <strong className={commonStyles.heading}>
                Criando um app CRA do zero
              </strong>
              <p className={commonStyles.paragraph}>
                Tudo sobre como criar a sua primeira aplicação utilizando
                Create React App
              </p>
              <div>
                <time className={commonStyles.infos}>
                  <FiCalendar />
                  19 Abr 2021
                </time>
                <span className={commonStyles.infos}>
                  <FiUser />
                  Joseph Oliveira
                </span>
              </div>
            </a>
          </Link>
          <Link href="luga">
            <a>
              <strong className={commonStyles.heading}>
                Criando um app CRA do zero
              </strong>
              <p className={commonStyles.paragraph}>
                Tudo sobre como criar a sua primeira aplicação utilizando
                Create React App
              </p>
              <div>
                <time className={commonStyles.infos}>
                  <FiCalendar />
                  19 Abr 2021
                </time>
                <span className={commonStyles.infos}>
                  <FiUser />
                  Joseph Oliveira
                </span>
              </div>
            </a>
          </Link>
          <Link href="luga">
            <a>
              <strong className={commonStyles.heading}>
                Criando um app CRA do zero
              </strong>
              <p className={commonStyles.paragraph}>
                Tudo sobre como criar a sua primeira aplicação utilizando
                Create React App
              </p>
              <div>
                <time className={commonStyles.infos}>
                  <FiCalendar />
                  19 Abr 2021
                </time>
                <span className={commonStyles.infos}>
                  <FiUser />
                  Joseph Oliveira
                </span>
              </div>
            </a>
          </Link>
          <Link href="luga">
            <a>
              <strong className={commonStyles.heading}>
                Criando um app CRA do zero
              </strong>
              <p className={commonStyles.paragraph}>
                Tudo sobre como criar a sua primeira aplicação utilizando
                Create React App
              </p>
              <div>
                <time className={commonStyles.infos}>
                  <FiCalendar />
                  19 Abr 2021
                </time>
                <span className={commonStyles.infos}>
                  <FiUser />
                  Joseph Oliveira
                </span>
              </div>
            </a>
          </Link>
          <Link href="luga">
            <a>
              <strong className={commonStyles.heading}>
                Criando um app CRA do zero
              </strong>
              <p className={commonStyles.paragraph}>
                Tudo sobre como criar a sua primeira aplicação utilizando
                Create React App
              </p>
              <div>
                <time className={commonStyles.infos}>
                  <FiCalendar />
                  19 Abr 2021
                </time>
                <span className={commonStyles.infos}>
                  <FiUser />
                  Joseph Oliveira
                </span>
              </div>
            </a>
          </Link>
        </section>
      </main>
    </>
  );
}

// export const getStaticProps = async () => {
//   // const prismic = getPrismicClient({});
//   // const postsResponse = await prismic.getByType(TODO);

//   // TODO
// };
