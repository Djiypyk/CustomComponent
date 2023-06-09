import { FC, useContext } from 'react'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react-lite'

import { LoginType } from '../../Layout'
import { SVG } from '~/components'
import { BurgerMenu } from '~/icons'
import { Context } from '~/main'
import { PATH } from '~/constant'

import styles from './header.module.css'

import { LoginButton } from '../LoginButton'

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
				{!isSmallWindowWidth && (
					<div className={styles.loginBlock}>
						{store.isLoading && '...'}
						{!store.isLoading && (
							<div className={styles.loginBlockEnter}>
								{store.isAuth && (
									<>
										<LoginButton>
											<Link
												to={`${PATH.USER_PAGE}/${store.user.id}`}
												className={styles.headerLink}
											>
												Profile
											</Link>
										</LoginButton>
										<LoginButton onClick={store.logout}>Logout</LoginButton>
									</>
								)}
								{!store.isAuth && (
									<>
										<LoginButton onClick={() => openLoginModal('login')}>
											Login
										</LoginButton>
										<LoginButton onClick={() => openLoginModal('signUp')}>
											Sign Up
										</LoginButton>
									</>
								)}
							</div>
						)}
					</div>
				)}
			</header>
		)
	},
)

export default Header
