import { SignInButton } from '../SignInButton';
import Link from 'next/link';

import styles from './styles.module.scss';
import { useRouter } from 'next/dist/client/router';
import { ActiveLink } from '../activeLink';

export function Header() {
    const { asPath } = useRouter();

    return(
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <img src='/images/logo.svg' alt='ig.news'/>
                <nav>
                    <ActiveLink href='/' activeClassname={styles.active}>
                        <a>Home</a>
                    </ActiveLink>
                    <ActiveLink href='/posts' activeClassname={styles.active}>
                        <a>Posts</a>
                    </ActiveLink>
                </nav>
                
                <SignInButton/>
            </div>
        </header>
    )
}