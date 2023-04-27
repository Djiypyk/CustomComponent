import { FC, ReactNode, useEffect, useMemo } from 'react'
import { createPortal } from 'react-dom'

import styles from './Modal.module.css'

interface IModalProps {
	open: boolean
	onClose(): void
	children: ReactNode
	stylesProps?: string
}

const modalRootElement = document.querySelector('#modal')

export const Modal: FC<IModalProps> = ({
	open,
	onClose,
	children,
	stylesProps,
}) => {
	const element = useMemo(() => document.createElement('div'), [])

	useEffect(() => {
		if (open) {
			modalRootElement?.appendChild(element)
			return () => {
				modalRootElement?.removeChild(element)
			}
		}
	}, [open, modalRootElement])

	const handleContentClick = (
		event: React.MouseEvent<HTMLDivElement, MouseEvent>,
	) => {
		event.stopPropagation()
	}

	if (open) {
		return createPortal(
			<div className={styles.wrapper} onClick={onClose}>
				<div
					className={`${styles.wrapperBlock} ${stylesProps}`}
					onClick={handleContentClick}
				>
					{children}
				</div>
			</div>,
			element,
		)
	}

	return null
}
export default Modal
