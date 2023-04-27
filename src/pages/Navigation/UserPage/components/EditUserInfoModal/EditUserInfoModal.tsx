import { FC, useContext, useState } from 'react'
import { observer } from 'mobx-react-lite'

import styles from './EditUserInfoModal.module.css'

import { Button, Modal, TextInput } from '~/components'
import { Context } from '~/main'

interface IEditUserInfoModal {
	onClose: () => void
	open: boolean
}

export const EditUserInfoModal: FC<IEditUserInfoModal> = observer(
	({ onClose, open = false }) => {
		const { store } = useContext(Context)
		const [email, setEmail] = useState(store.user.email)
		const [userName, setUserName] = useState(store.user.name)
		const [location, setLocation] = useState(store.user.location)
		const [workPosition, setWorkPosition] = useState(store.user.workPosition)
		const [password, setPassword] = useState('')

		const saveProfile = async () => {
			await store.updateUser({
				email,
				name: userName,
				location,
				workPosition,
				password,
			})

			onClose()
		}
		return (
			<Modal stylesProps={styles.modal} open={open} onClose={onClose}>
				<span onClick={onClose} className={styles.closeModal}>
						&#10006;
					</span>
				<div className={styles.wrapperBlock}>
					<span className={styles.header}>Edit profile</span>
					<TextInput title={'Email'} value={email} onChange={setEmail} />
					<TextInput
						title={'User Name'}
						value={userName}
						onChange={setUserName}
					/>
					<TextInput
						title={'Location'}
						value={location}
						onChange={setLocation}
					/>

					<TextInput
						title={'Work Position'}
						value={workPosition}
						onChange={setWorkPosition}
					/>
					<TextInput
						title={'Password'}
						value={password}
						onChange={setPassword}
						type='password'
					/>

					<Button
						disabled={store.isLoading}
						stylesProps={styles.btn}
						onClick={saveProfile}
					>
						Save Profile
					</Button>
				</div>
			</Modal>
		)
	},
)

export default EditUserInfoModal
