import { Button, Modal, TextInput } from '../../../../components'
import { FC } from 'react'
import styles from './LoginModal.module.css'

interface ILoginModalProps {
    closeModal?(): void
    isModal: boolean
}

export const LoginModal: FC<ILoginModalProps> = ({closeModal, isModal}) => {
	return (
		<Modal onClose={closeModal} isVisible={isModal}>
			<div className={styles.modalWrapper}>
				<span onClick={closeModal} className={styles.closeModal}>
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
		</Modal>
	)
}

export default LoginModal
