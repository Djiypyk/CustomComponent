import { FC } from 'react'
import styles from './InfoField.module.css'

interface IInfoFieldProps {
	text: string
}

export const InfoField: FC<IInfoFieldProps> = ({ text }) => {
	return <span className={styles.text}>{text}</span>
}

export default InfoField
