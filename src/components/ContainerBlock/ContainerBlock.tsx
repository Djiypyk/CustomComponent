import { FC, MutableRefObject, ReactNode } from 'react'

import styles from './ContainerBlock.module.css'

interface ContainerBlockProps {
	children: ReactNode
	classNameProps?: string
	forwardedRef?: MutableRefObject<HTMLDivElement | null>
}

export const ContainerBlock: FC<ContainerBlockProps> = ({
	children,
	classNameProps,
	forwardedRef,
}) => {
	return (
		<div ref={forwardedRef} className={`${styles.wrapper} ${classNameProps}`}>
			{children}
		</div>
	)
}
export default ContainerBlock
