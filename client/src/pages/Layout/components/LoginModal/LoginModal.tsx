import { FC, useContext, useState } from 'react'
import { observer } from 'mobx-react-lite'
import Web3 from 'web3'

import styles from './LoginModal.module.css'

import { LoginType } from '../../Layout'
import { Button, Modal, TextInput, ConnectButton } from '../../../../components'
import { Context } from '../../../../main'
import { CLIENT_URL } from '../../../../constant'
import { getLinker, mobileCheck } from './helpers'

interface ILoginModalProps {
	closeModal(): void
	isModal: boolean
	loginType: LoginType | null
}

export const LoginModal: FC<ILoginModalProps> = ({ closeModal, isModal, loginType }) => {
	const { store } = useContext(Context)
	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const [loading, setLoading] = useState(false)
	const [address, setAddress] = useState('')

	const onLogin = async () => {
		await store.login(email, password)

		if (store.error) {
			return
		}
		setEmail('')
		setPassword('')
		closeModal()
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
					setAddress(account)
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
		} catch (error) {
			console.log(error)
		} finally {
			setLoading(false)
		}
	}

	const onPressLogout = async () => {
		await store.logout()
		setAddress('')
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

				<div>
					{!store.user.id && (
						<>
							<TextInput
								title='Email:'
								value={email}
								onChange={setEmail}
								placeholder='Enter your email'
							/>

							<TextInput
								type={'password'}
								title='Password:'
								value={password}
								onChange={setPassword}
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
						stylesProps={styles.buttonBlockPadding}
						title={loginType === 'login' ? 'Log In' : 'Sign In'}
						onClick={loginType === 'login' ? onLogin : onRegistration}
					/>
					<ConnectButton
						onPressConnect={onPressConnect}
						onPressLogout={onPressLogout}
						loading={loading}
						address={address}
					/>
				</div>
			</div>
		</Modal>
	)
}

export default observer(LoginModal)
