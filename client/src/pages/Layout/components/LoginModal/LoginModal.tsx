import { Button, Modal, TextInput } from '../../../../components'
import { FC } from 'react'
import styles from './LoginModal.module.css'
import { useLogin } from 'pages/Layout/hooks'

interface ILoginModalProps {
	closeModal?(): void
	isModal: boolean
}

export const LoginModal: FC<ILoginModalProps> = ({ closeModal, isModal }) => {
	const { email, password, changeEmail, changePassword } = useLogin()
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
					<TextInput title='Email' value={email} onChange={changeEmail} />

					<TextInput title='Password' value={password} onChange={changePassword} />
				</div>

				<div className={styles.buttonBlock}>
					<Button title='Login' />
				</div>
			</div>
		</Modal>
	)
}

export default LoginModal
