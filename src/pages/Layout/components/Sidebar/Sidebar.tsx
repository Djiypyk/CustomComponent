import { FC } from 'react'
import { NavLink } from 'react-router-dom'

import { PATH } from '../../../../constant'

import styles from './sidebar.module.css'

interface ISidebarProps {
	isOpen: boolean
	toggleMenu(): void
}

export const Sidebar: FC<ISidebarProps> = ({ toggleMenu, isOpen }) => {
	const menuStateStyle = `${styles.sidebar} ${isOpen ? styles.open : styles.close}`

	const onActive = (props: { isActive: boolean; isPending: boolean }) => {
		const { isActive } = props
		return `${styles.link} ${isActive ? styles.activeLink : ''}`
	}

	return (
		<nav className={menuStateStyle}>
			<span className={`${styles.closeLink} ${styles.link}`} onClick={toggleMenu}>
				{' '}
				&#10006;
			</span>
			<NavLink className={onActive} to={PATH.MAIN} onClick={toggleMenu}>
				Home
			</NavLink>
			<NavLink className={onActive} to={PATH.LOADERS} onClick={toggleMenu}>
				Loaders
			</NavLink>
			<NavLink className={onActive} to={PATH.BUTTONS} onClick={toggleMenu}>
				Buttons
			</NavLink>
		</nav>
	)
}
export default Sidebar
