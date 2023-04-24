import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'

import { Context } from '../../../main'
import { ContainerBlock } from '../../../components'
import { PATH } from '../../../constant'
import styles from './UserPage.module.css'
import userIcon from '../../../assets/png/userIcon.png'
import { InfoField } from './components'

export const UserPage = observer(() => {
	const { store } = useContext(Context)

	if (!store.isAuth && store.isLoading) {
		return <Navigate to={PATH.MAIN} />
	}
	return (
		<div className={styles.wrapper}>
			<ContainerBlock classNameProps={styles.parent}>
				<img className={styles.avatar} src={userIcon} alt='User Avatar' />
				<InfoField text={`User Id: ${store.user.id}`} />
				<InfoField text={`User Email: ${store.user.email}`} />
			</ContainerBlock>
		</div>
	)
})

export default UserPage
