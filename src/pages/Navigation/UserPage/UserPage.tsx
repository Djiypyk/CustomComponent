import {lazy, useContext, useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'

import { Context } from '~/main'
import { ContainerBlock } from '~/components'
import { PATH } from '~/constant'
import { Edit } from '~/icons'
import userIcon from '~/assets/png/userIcon.png'

import { EditUserInfoModal, InfoField } from './components'
import styles from './UserPage.module.css'

export const UserPage = observer(() => {
	const { store } = useContext(Context)
	const navigate = useNavigate()
	const [openEditModal, setOpenEditModal] = useState(false)

	useEffect(() => {
		if (!store.isAuth) {
			navigate(PATH.MAIN)
		}
	}, [store.isAuth, navigate])

	return (
		<div className={styles.wrapper}>
			<EditUserInfoModal
				open={openEditModal}
				onClose={() => setOpenEditModal(false)}
			/>
			<ContainerBlock classNameProps={styles.parent}>
				<Edit
					width='24px'
					height='24px'
					classNameProps={styles.editIcon}
					onClick={() => setOpenEditModal(true)}
				/>
				<img className={styles.avatar} src={userIcon} alt='User Avatar' />
				<div className={styles.infoBlock}>
					<InfoField title={'User Name'} text={store.user.name} />
					<InfoField title={'User Id'} text={store.user.id} />
					<InfoField
						title={'User Email'}
						text={store.user.email || undefined}
					/>
					<InfoField title={'Location'} text={store.user.location} />
					<InfoField title={'Work Position'} text={store.user.workPosition} />
				</div>
			</ContainerBlock>
		</div>
	)
})

export default UserPage

