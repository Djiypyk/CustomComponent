import { FC, useContext } from 'react'
import { observer } from 'mobx-react-lite'

import styles from './LoginModal.module.css'

import { useLogin } from '../../hooks'
import { LoginType } from '../../Layout'
import { Button, Modal, TextInput } from '../../../../components'
import { Context } from '../../../../main'

interface ILoginModalProps {
	closeModal(): void
	isModal: boolean
	loginType: LoginType | null
}

export const LoginModal: FC<ILoginModalProps> = ({ closeModal, isModal, loginType }) => {
	const { store } = useContext(Context)
	const { email, password, changeEmail, changePassword } = useLogin()

	const onLogin = async () => {
		await store.login(email, password)
		console.log(store.error)
		if (store.error) {
			return
		}
		closeModal()
	}

	const onRegistration = async () => {
		await store.registration(email, password)

		if (store.error) {
			return
		}
	}

	return (
		<Modal onClose={closeModal} isVisible={isModal}>
			<div className={styles.modalWrapper}>
				<span onClick={closeModal} className={styles.closeModal}>
					{' '}
					&#10006;
				</span>
				<div className={styles.modalHeader}>
					<span>{loginType === 'login' ? 'Login' : 'Sign In'}</span>
				</div>
	
				<div className={styles.inputBlock}>
				{!store.user.id && (
					<>
						<TextInput
							title='Email:'
							value={email}
							onChange={changeEmail}
							placeholder='Enter your email'
						/>

						<TextInput
							type={'password'}
							title='Password:'
							value={password}
							onChange={changePassword}
							placeholder='Enter your password'
						/>
					</>
				)}
					{!store.user.isActivated && store.user.id && (
						<div className={styles.confirmEmail}>
							<span>We sent an email to you to confirm your mail. Please confirm your email.</span>
						</div>
					)}
				</div>

				<div className={styles.buttonBlock}>
					<Button
						title={loginType === 'login' ? 'Log In' : 'Sign In'}
						onClick={loginType === 'login' ? onLogin : onRegistration}
					/>
				</div>
			</div>
		</Modal>
	)
}

export default observer(LoginModal)
