import styles from './header.module.css';

export const Header = () => {
    return (
        <header className={styles.wrapper}>
            <span className={styles.title}>Custom Components</span>
            <div>
                <span>Menu</span>
            </div>
        </header>
    );
};
export default Header;
