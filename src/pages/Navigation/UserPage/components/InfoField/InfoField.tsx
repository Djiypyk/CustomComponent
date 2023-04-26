import { FC } from 'react'
import styles from './InfoField.module.css'

interface IInfoFieldProps {
	title: string
	text?: string
}

export const InfoField: FC<IInfoFieldProps> = ({ title, text }) => {
	return <span className={styles.text}>{`${title}: ${text}`}</span>
}

export default InfoField
