import { FC } from 'react';
import styles from './header.module.css';

interface IHeaderProps {
    toggleMenu(): void;
}

export const Header: FC<IHeaderProps> = ({ toggleMenu }) => {
    return (
        <header className={styles.wrapper}>
            <span className={styles.title}>Custom Components</span>
            <div className={styles.toggleMenu}>
                <span onClick={toggleMenu}>Menu</span>
            </div>
        </header>
    );
};
export default Header;
