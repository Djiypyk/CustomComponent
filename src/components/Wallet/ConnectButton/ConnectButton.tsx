import { FC } from 'react'
import styles from './ConnectButton.module.css'

interface IConnectButton {
	onPressLogout(): void
	onPressConnect(): void
	loading: boolean
	address: string
}

export const ConnectButton: FC<IConnectButton> = ({
	onPressLogout,
	onPressConnect,
	loading,
	address,
}) => {
	return (
		<div>
			{address && !loading ? (
				<button onClick={onPressLogout} className={styles.connectWallet}>
					Disconnect
				</button>
			) : loading ? (
				<button
					className={`${styles.connectWallet} ${styles.connectButtonLoading}`}
					disabled
				>
					<div>Loading...</div>
				</button>
			) : (
				<button onClick={onPressConnect} className={styles.connectWallet}>
					Connect Wallet
				</button>
			)}
		</div>
	)
}

export default ConnectButton
