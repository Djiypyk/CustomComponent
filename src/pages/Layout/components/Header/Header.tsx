import { FC } from 'react';
import { SVG } from '../../../../components/Svg';
import { BurgerMenu } from '../../../../icons';
import styles from './header.module.css';

interface IHeaderProps {
    toggleMenu(): void;
}

export const Header: FC<IHeaderProps> = ({ toggleMenu }) => {
    return (
        <header className={styles.wrapper}>
            <div className={styles.toggleMenu}>
                <SVG onClick={toggleMenu}>
                    <BurgerMenu />
                </SVG>

                {/* <span>Menu</span> */}
            </div>
            <span className={styles.title}>Custom Components</span>
        </header>
    );
};
export default Header;
