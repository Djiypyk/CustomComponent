import { ChangeEvent, FC, HTMLInputTypeAttribute } from 'react'
import styles from './TextInput.module.css'

interface ITextInputProps {
	onChange?: (e: ChangeEvent<HTMLInputElement>) => void
	value?: string
	placeholder?: string
	title?: string
	type?: HTMLInputTypeAttribute | undefined
}

export const TextInput: FC<ITextInputProps> = ({
	onChange,
	value,
	placeholder,
	type = 'text',
	title,
	...props
}) => {
	return (
		<div className={styles.wrapper + ' ' + Boolean(title) ? styles.isLabel : ''}>
			<label className={styles.inputLabel} htmlFor={title}>
				{title}
			</label>
			<input
				name={title}
				className={styles.input}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
				type={type}
			/>
		</div>
	)
}

export default TextInput
