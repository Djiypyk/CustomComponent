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

export const Header: FC<IHeaderProps> = observer(({ toggleMenu, openLoginModal }) => {
	const { store } = useContext(Context)

	return (
		<header className={styles.wrapper}>
			<div className={styles.toggleMenu}>
				<SVG onClick={toggleMenu}>
					<BurgerMenu />
				</SVG>
			</div>
			<h1 className={styles.title}>Custom Components {store.isAuth}</h1>
			<div className={styles.loginBlock}>
				{store.isLoading && '...'}
				{!store.isLoading && (
					<>
						<LoginButton onClick={store.isAuth ? store.logout : () => openLoginModal('login')}>
							{store.isAuth ? 'Logout' : 'Login'}
						</LoginButton>
						{!store.isAuth && (
							<LoginButton onClick={() => openLoginModal('signIn')}>Sign Up</LoginButton>
						)}
					</>
				)}
			</div>
		</header>
	)
})

// export default observer(Header)
