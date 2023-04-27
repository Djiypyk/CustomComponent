import { FC, useContext } from 'react'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react-lite'

import styles from './header.module.css'

import { LoginButton } from './LoginButton'

import { LoginType } from '../../Layout'
import { SVG } from '../../../../components'
import { BurgerMenu } from '../../../../icons'
import { Context } from '../../../../main'
import { PATH } from '../../../../constant'

interface IHeaderProps {
	toggleMenu(): void
	openLoginModal(loginType: LoginType): void
}

const isSmallWindowWidth = window.innerWidth <= 767

export const Header: FC<IHeaderProps> = observer(
	({ toggleMenu, openLoginModal }) => {
		const { store } = useContext(Context)

		return (
			<header className={styles.wrapper}>
				<div className={styles.toggleMenu}>
					<SVG onClick={toggleMenu}>
						<BurgerMenu />
					</SVG>
				</div>
				<Link to={PATH.MAIN} className={styles.title}>
					Custom Components
				</Link>
				<div className={styles.loginBlock}>
					{store.isLoading && '...'}
					{!store.isLoading && (
						<>
							{store.isAuth && (
								<LoginButton>
									<Link
										to={`${PATH.USER_PAGE}/${store.user.id}`}
										className={styles.headerLink}
									>
										Profile
									</Link>
								</LoginButton>
							)}
							{!isSmallWindowWidth && store.isAuth && (
								<LoginButton onClick={store.logout}>{'Logout'}</LoginButton>
							)}

							{!store.isAuth && (
								<>
									<LoginButton onClick={() => openLoginModal('login')}>
										{'Login'}
									</LoginButton>
									<LoginButton onClick={() => openLoginModal('signIn')}>
										Sign Up
									</LoginButton>
								</>
							)}
						</>
					)}
				</div>
			</header>
		)
	},
)

export default Header
