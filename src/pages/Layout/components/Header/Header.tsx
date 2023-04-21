import { FC, useContext } from 'react'
import { observer } from 'mobx-react-lite'

import styles from './header.module.css'

import { LoginButton } from './LoginButton'

import { LoginType } from '../../Layout'
import { SVG } from '../../../../components'
import { BurgerMenu } from '../../../../icons'
import { Context } from '../../../../main'

interface IHeaderProps {
	toggleMenu(): void
	openLoginModal(loginType: LoginType): void
}

export const Header: FC<IHeaderProps> = ({ toggleMenu, openLoginModal }) => {
	const { isAuth: isLogin, logout, user, isLoading } = useContext(Context).store

	return (
		<header className={styles.wrapper}>
			<div className={styles.toggleMenu}>
				<SVG onClick={toggleMenu}>
					<BurgerMenu />
				</SVG>
			</div>
			<h1 className={styles.title}>Custom Components {isLogin}</h1>
			<div className={styles.loginBlock}>
				{isLoading && '...'}
				{!isLoading && (
					<>
						<LoginButton onClick={isLogin ? logout : () => openLoginModal('login')}>
							{isLogin ? 'Logout' : 'Login'}
						</LoginButton>
						{!isLogin && (
							<LoginButton onClick={() => openLoginModal('signIn')}>Sign Up</LoginButton>
						)}
					</>
				)}
			</div>
		</header>
	)
}
export default observer(Header)
