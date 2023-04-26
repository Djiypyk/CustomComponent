import { ChangeEvent, FC, HTMLInputTypeAttribute, useState } from 'react'

import styles from './TextInput.module.css'

import passwordEye from './assets/img/eye.png'
import hidePasswordEye from './assets/img/hideEye.png'

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
	const [showPassword, setShowPassword] = useState(false)
	const changeInputValue = (e: ChangeEvent<HTMLInputElement>) => {
		onChange(e.currentTarget.value)
	}
	return (
		<div
			className={styles.wrapper + ' ' + Boolean(title) ? styles.isLabel : ''}
		>
			<label className={styles.inputLabel} htmlFor={title}>
				{title}
			</label>
			<div className={styles.inputWrapper}>
				<input
					disabled={disabled}
					name={title}
					className={`${styles.input} ${
						type === 'password' && styles.inputPassword
					}`}
					placeholder={placeholder}
					value={value}
					onChange={changeInputValue}
					type={
						type !== 'password' ? 'text' : showPassword ? 'text' : 'password'
					}
				/>
				{type === 'password' && value && (
					<img
						className={styles.passwordIcon}
						onClick={() => setShowPassword((prev) => !prev)}
						src={showPassword ? passwordEye : hidePasswordEye}
					/>
				)}
			</div>
		</div>
	)
}

export default TextInput
