import { FC, useState } from 'react';
import { Outlet } from 'react-router-dom';

import { Header } from './components';

import styles from './Layout.module.css';

export const Layout: FC = () => {
    const [isOpenMenu, setIsOpenMenu] = useState(false);
    const toggleMenu = () => setIsOpenMenu((prev) => !prev);
    return (
        <div className={styles.wrapper}>
            <Header toggleMenu={toggleMenu} />
            <main className={styles.content}>
                <Outlet />
            </main>
        </div>
    );
};
export default Layout;
