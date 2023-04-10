import { FC, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Modal } from '../../components'

import { Header, Sidebar } from './components'

import styles from './Layout.module.css'

export const Layout: FC = () => {
	const [isOpenMenu, setIsOpenMenu] = useState(false)
	const toggleMenu = () => setIsOpenMenu((prev) => !prev)
	const [isLoginModal, setIsLoginModal] = useState(false)

	const closeLoginModal = () => setIsLoginModal(false)
	const openLoginModal = () => setIsLoginModal(true)
	return (
		<div className={styles.wrapper}>
			<Modal onClose={closeLoginModal} isVisible={isLoginModal} />
			<Header openLoginModal={openLoginModal} toggleMenu={toggleMenu} />
			<Sidebar toggleMenu={toggleMenu} isOpen={isOpenMenu} />
			<main className={styles.content}>
				<Outlet />
			</main>
		</div>
	)
}
export default Layout
