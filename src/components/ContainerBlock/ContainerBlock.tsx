import { FC, ReactNode } from 'react'

import styles from './ContainerBlock.module.css'

interface ContainerBlockProps {
	children: ReactNode
	classNameProps?: string
}

export const ContainerBlock: FC<ContainerBlockProps> = ({ children, classNameProps }) => {
	return <div className={`${styles.wrapper} ${classNameProps}`}>{children}</div>
}
export default ContainerBlock
