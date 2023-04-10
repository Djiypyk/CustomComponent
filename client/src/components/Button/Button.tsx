import { FC, ReactNode } from 'react'

import styles from './Button.module.css'

interface IButtonProps {
	onClick?(): void
	children?: ReactNode
	title?: string
}

export const Button: FC<IButtonProps> = ({ onClick, children, title = 'Button' }) => {
	return (
		<div className={styles.wrapper}>
			<button className={styles.button} onClick={onClick}>
				{children ? children : title}
			</button>
		</div>
	)
}
