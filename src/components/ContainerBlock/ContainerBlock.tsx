import { FC, ReactNode } from 'react'

import styles from './ContainerBlock.module.css'

interface ContainerBlockProps {
	children: ReactNode
}

export const ContainerBlock: FC<ContainerBlockProps> = ({ children }) => {
	return <div className={styles.wrapper}>{children}</div>
}
export default ContainerBlock
