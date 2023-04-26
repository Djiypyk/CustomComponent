import { FC, ReactNode } from 'react'

import styles from './Button.module.css'

interface IButtonProps {
	onClick?(): void
	children?: ReactNode
	title?: string
	stylesProps?: string
	disabled?: boolean
}

export const Button: FC<IButtonProps> = ({
	onClick,
	children,
	title = 'Button',
	stylesProps,
	disabled,
}) => {
	return (
		<div
			className={`${styles.wrapper} ${stylesProps} ${
				disabled && styles.disabled
			}`}
		>
			<button className={styles.button} onClick={onClick} disabled={disabled}>
				{children ? children : title}
			</button>
		</div>
	)
}
