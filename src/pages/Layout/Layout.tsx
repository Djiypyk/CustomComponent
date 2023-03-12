import { FC } from 'react';
import { Outlet } from 'react-router-dom';

import { Header } from '../Header';

import styles from './Layout.module.css';

export const Layout: FC = () => {
    return (
        <div className={styles.wrapper}>
            <Header />
            <main className={styles.content}>
                <Outlet />
            </main>
        </div>
    );
};
export default Layout
