import { FC, useState } from 'react'
import { SVG } from '../../../../components'
import { BurgerMenu } from '../../../../icons'
import styles from './header.module.css'
import { LoginButton } from './LoginButton'

interface IHeaderProps {
	toggleMenu(): void
	openLoginModal(): void
}

export const Header: FC<IHeaderProps> = ({ toggleMenu, openLoginModal }) => {
	const [isLogin, setIsLogin] = useState(false)

	return (
		<header className={styles.wrapper}>
			<div className={styles.toggleMenu}>
				<SVG onClick={toggleMenu}>
					<BurgerMenu />
				</SVG>
			</div>
			<h1 className={styles.title}>Custom Components</h1>
			<div className={styles.loginBlock}>
				<LoginButton onClick={openLoginModal}>{isLogin ? 'Logout' : 'Login'}</LoginButton>
				{!isLogin && <LoginButton onClick={openLoginModal}>Sign in</LoginButton>}
			</div>
		</header>
	)
}
export default Header
