import Link from 'next/link';
import Image from 'next/image';

import styles from './header.module.scss';
import commonModule from '../../styles/common.module.scss';

export default function Header(): JSX.Element {
  return (
    <header className={`${styles.header} ${commonModule.container}`}>
      <Link href="/">
        <a>
          <Image src="/logo.svg" alt="logo" width={240} height={26} />
        </a>
      </Link>
    </header>
  );
}
