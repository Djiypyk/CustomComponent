import { FC } from 'react'
import { Button } from '../Button'
import { TextInput } from '../TextInput'

import styles from './Modal.module.css'

interface IModalProps {
	isVisible: boolean
	onClose?(): void
}

export const Modal: FC<IModalProps> = ({ isVisible, onClose }) => {
	return isVisible ? (
		<div className={styles.wrapper}>
			<div className={styles.wrapperBlock}>
				<span onClick={onClose} className={styles.closeModal}>
					{' '}
					&#10006;
				</span>
				<div className={styles.modalHeader}>
					<span>Login</span>
				</div>

				<div className={styles.inputBlock}>
					<TextInput title='Email' />
					<TextInput title='Password' />
				</div>

				<div className={styles.buttonBlock}>
					<Button title='Login' />
				</div>
			</div>
		</div>
	) : null
}
export default Modal
