import { FC, HTMLAttributes, ReactNode } from 'react'

import styles from './Button.module.css'

interface IButtonProps {
	onClick?(): void
	children?: ReactNode
	title?: string
	stylesProps?: HTMLAttributes<HTMLDivElement>
}

export const Button: FC<IButtonProps> = ({ onClick, children, title = 'Button', stylesProps }) => {
	return (
		<div className={`${styles.wrapper} ${stylesProps}`}>
			<button className={styles.button} onClick={onClick}>
				{children ? children : title}
			</button>
		</div>
	)
}
