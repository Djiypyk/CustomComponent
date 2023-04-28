import { observer } from 'mobx-react-lite'
import { FC, useContext } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Context } from '~/main'

import { PATH } from '../../../../constant'
import { LoginButton } from '../LoginButton'

import styles from './sidebar.module.css'

interface ISidebarProps {
	isOpen: boolean
	toggleMenu(): void
	openLoginModal(type: string): void
}
const isSmallWindowWidth = window.innerWidth <= 767

export const Sidebar: FC<ISidebarProps> = observer(
	({ toggleMenu, isOpen, openLoginModal }) => {
		const { store } = useContext(Context)
		const menuStateStyle = `${styles.sidebar} ${
			isOpen ? styles.open : styles.close
		}`

		const onActive = (props: { isActive: boolean; isPending: boolean }) => {
			const { isActive } = props
			return `${styles.link} ${isActive ? styles.activeLink : ''}`
		}

		return (
			<nav className={menuStateStyle}>
				<span
					className={`${styles.closeLink} ${styles.link}`}
					onClick={toggleMenu}
				>
					&#10006;
				</span>
				<div className={styles.content}>
					<div className={styles.navBlock}>
						<NavLink className={onActive} to={PATH.MAIN} onClick={toggleMenu}>
							Home
						</NavLink>
						<NavLink
							className={onActive}
							to={PATH.LOADERS}
							onClick={toggleMenu}
						>
							Loaders
						</NavLink>
						<NavLink
							className={onActive}
							to={PATH.BUTTONS}
							onClick={toggleMenu}
						>
							Buttons
						</NavLink>
					</div>
					{isSmallWindowWidth && (
						<div className={styles.loginBlock}>
							{!store.isAuth && (
								<>
									<LoginButton
										className={styles.loginBtn}
										onClick={() => openLoginModal('login')}
									>
										Login
									</LoginButton>
									<LoginButton
										className={styles.loginBtn}
										onClick={() => openLoginModal('signUp')}
									>
										Sign Up
									</LoginButton>
								</>
							)}
							{store.isAuth && (
								<>
									<LoginButton>
										<Link
											to={`${PATH.USER_PAGE}/${store.user.id}`}
											className={styles.loginBtn}
										>
											Profile
										</Link>
									</LoginButton>
									<LoginButton
										className={styles.loginBtn}
										onClick={store.logout}
									>
										Logout
									</LoginButton>
								</>
							)}
						</div>
					)}
				</div>
			</nav>
		)
	},
)
export default Sidebar
