import { observer } from 'mobx-react-lite'
import { FC, useState } from 'react'
import { Outlet } from 'react-router-dom'

import { Header, LoginModal, Sidebar } from './components'

import styles from './Layout.module.css'

export type LoginType = 'login' | 'signUp'

export const Layout: FC = () => {
	const [isOpenMenu, setIsOpenMenu] = useState(false)
	const toggleMenu = () => setIsOpenMenu((prev) => !prev)
	const [isLoginModal, setIsLoginModal] = useState(false)
	const [loginType, setLoginType] = useState<LoginType | null>(null)

	const closeLoginModal = () => setIsLoginModal(false)

	const openLoginModal = (loginType: LoginType) => {
		setLoginType(loginType)
		setIsLoginModal(true)
	}

	return (
		<div className={styles.wrapper}>
			<LoginModal
				loginType={loginType}
				isModal={isLoginModal}
				closeModal={closeLoginModal}
			/>
			<Header openLoginModal={openLoginModal} toggleMenu={toggleMenu} />
			<Sidebar
				toggleMenu={toggleMenu}
				isOpen={isOpenMenu}
				openLoginModal={openLoginModal}
			/>
			<main className={styles.content}>
				<Outlet />
			</main>
		</div>
	)
}
export default observer(Layout)
