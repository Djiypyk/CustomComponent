import { FC } from 'react'
import { SVG } from '../../../../components'
import { BurgerMenu } from '../../../../icons'
import styles from './header.module.css'

interface IHeaderProps {
	toggleMenu(): void
}

export const Header: FC<IHeaderProps> = ({ toggleMenu }) => {
	return (
		<header className={styles.wrapper}>
			<div className={styles.toggleMenu}>
				<SVG onClick={toggleMenu}>
					<BurgerMenu />
				</SVG>
			</div>
			<h1 className={styles.title}>Custom Components</h1>
		</header>
	)
}
export default Header
