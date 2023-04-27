import { FC, useContext, useRef, useState } from 'react'
import { observer } from 'mobx-react-lite'
import Web3 from 'web3'

import styles from './LoginModal.module.css'

import { LoginType } from '../../Layout'
import {
	Button,
	Modal,
	TextInput,
	ConnectButton,
	Loader,
} from '../../../../components'
import { Context } from '../../../../main'
import { CLIENT_URL } from '../../../../constant'
import { getLinker, mobileCheck } from './helpers'

interface ILoginModalProps {
	closeModal(): void
	isModal: boolean
	loginType: LoginType | null
}

export const LoginModal: FC<ILoginModalProps> = observer(
	({ closeModal, isModal, loginType }) => {
		const { store } = useContext(Context)
		const [email, setEmail] = useState<string>('')
		const [password, setPassword] = useState<string>('')
		const [loading, setLoading] = useState(false)
		const addressRef = useRef('')

		const closeClearModal = () => {
			setEmail('')
			setPassword('')
			closeModal()
		}

		const onLogin = async () => {
			await store.login(email, password)

			if (store.error) {
				return
			}
			closeClearModal()
		}

		const onRegistration = async () => {
			await store.registration(email, password)

			if (store.error) {
				return
			}
			setEmail('')
			setPassword('')
		}

		const onPressConnect = async () => {
			setLoading(true)

			try {
				const yourWebUrl = CLIENT_URL
				const deepLink = `https://metamask.app.link/dapp/${yourWebUrl}`
				const downloadMetamaskUrl = 'https://metamask.io/download.html'

				if (window && window.ethereum && window.ethereum.isMetaMask) {
					if (window?.ethereum?.isMetaMask) {
						// Desktop browser
						const accounts = await window.ethereum.request({
							method: 'eth_requestAccounts',
						})

						const account = await Web3.utils.toChecksumAddress(accounts[0])
						addressRef.current = account
						await store.loginByEth(account)

						if (store.error) {
							return
						}
						closeModal()
					} else if (mobileCheck()) {
						// Mobile browser
						const linker = getLinker(downloadMetamaskUrl)
						linker.openURL(deepLink)
					} else {
						window.open(downloadMetamaskUrl)
					}
				}
				setLoading(false)
			} catch (error) {
				setLoading(false)
				console.log(error)
			}
		}

		const onPressLogout = async () => {
			await store.logout()
			setPassword('')
			setEmail('')
		}

		return (
			<Modal onClose={closeClearModal} open={isModal}>
				<div className={styles.modalWrapper}>
					<span onClick={closeClearModal} className={styles.closeModal}>
						&#10006;
					</span>
					<div className={styles.modalHeader}>
						<span>{loginType === 'login' ? 'Login' : 'Sign In'}</span>
					</div>
					{store.isLoading && <Loader />}
					<div>
						{!store.user.id && (
							<>
								<TextInput
									disabled={store.isLoading}
									title='Email'
									value={email}
									onChange={setEmail}
									placeholder='Enter your email'
								/>

								<TextInput
									disabled={store.isLoading}
									type={'password'}
									title='Password'
									value={password}
									onChange={setPassword}
									placeholder='Enter your password'
								/>
							</>
						)}
						{!store.user.isActivated && store.user.id && (
							<div className={styles.confirmEmail}>
								<span>
									We sent an email to you to confirm your mail. Please confirm
									your email.
								</span>
							</div>
						)}
					</div>

					<div className={styles.buttonBlock}>
						<Button
							stylesProps={styles.buttonBlockPadding}
							disabled={
								!(Boolean(email) && Boolean(password)) || store.isLoading
							}
							title={loginType === 'login' ? 'Log In' : 'Sign Up'}
							onClick={loginType === 'login' ? onLogin : onRegistration}
						/>
						<ConnectButton
							onPressConnect={onPressConnect}
							onPressLogout={onPressLogout}
							loading={loading}
							address={addressRef.current}
						/>
					</div>
				</div>
			</Modal>
		)
	},
)

export default LoginModal
