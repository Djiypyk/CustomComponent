import { FC, ReactNode } from 'react'

import styles from './Modal.module.css'

interface IModalProps {
	isVisible: boolean
	onClose(): void
	children: ReactNode
}

export const Modal: FC<IModalProps> = ({ isVisible, onClose, children }) => {
	return isVisible ? (
		<div className={styles.wrapper}>
			<div className={styles.wrapperBlock}>{children}</div>
		</div>
	) : null
}
export default Modal
