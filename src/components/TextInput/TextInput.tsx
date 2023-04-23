import { ChangeEvent, FC, HTMLInputTypeAttribute } from 'react'
import styles from './TextInput.module.css'

interface ITextInputProps {
	onChange: (value: string) => void
	value?: string
	placeholder?: string
	title?: string
	type?: HTMLInputTypeAttribute | undefined
	disabled?: boolean
}

export const TextInput: FC<ITextInputProps> = ({
	onChange,
	value,
	placeholder,
	type = 'text',
	title,
	disabled,
	...props
}) => {
	const changeInputValue = (e: ChangeEvent<HTMLInputElement>) => {
		onChange(e.currentTarget.value)
	}
	return (
		<div className={styles.wrapper + ' ' + Boolean(title) ? styles.isLabel : ''}>
			<label className={styles.inputLabel} htmlFor={title}>
				{title}
			</label>
			<input
				disabled={disabled}
				name={title}
				className={styles.input}
				placeholder={placeholder}
				value={value}
				onChange={changeInputValue}
				type={type}
			/>
		</div>
	)
}

export default TextInput
