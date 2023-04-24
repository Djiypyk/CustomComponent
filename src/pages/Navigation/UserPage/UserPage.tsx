import { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { Navigate } from 'react-router-dom'

import { Context } from '../../../main'
import { ContainerBlock } from '../../../components'
import { PATH } from '../../../constant'

export const UserPage = observer(() => {
	const { store } = useContext(Context)

	if (!store.isAuth) {
		return <Navigate to={PATH.MAIN} />
	}
	return (
		<div>
			<ContainerBlock>
				<h1>Hi</h1>
			</ContainerBlock>
		</div>
	)
})

export default UserPage
