import { FC, ReactNode } from 'react'

import styles from './LoginButton.module.css'

interface ILoginButtonProps {
	onClick?(): void
	disabled?: boolean
	children?: ReactNode
}

export const LoginButton: FC<ILoginButtonProps> = (props) => {
	return (
		<button className={styles.wrapper} {...props}>
			{props.children}
		</button>
	)
}

export default LoginButton
