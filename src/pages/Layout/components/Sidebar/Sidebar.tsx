import { FC } from 'react';
import { NavLink } from 'react-router-dom';

import { PATH } from '../../../../constant';

import styles from './sidebar.module.css';

interface ISidebarProps {
    isOpen: boolean;
    toggleMenu(): void;
}

export const Sidebar: FC<ISidebarProps> = ({ toggleMenu, isOpen }) => {
    const menuStateStyle = isOpen ? styles.open : styles.close;
    return (
        <nav className={styles.sidebar + ' ' + menuStateStyle}>
            <NavLink to={PATH.MAIN} onClick={toggleMenu}>
                Home
            </NavLink>
            <NavLink to={PATH.LOADERS} onClick={toggleMenu}>
                Loaders
            </NavLink>
        </nav>
    );
};
export default Sidebar;
