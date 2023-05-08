import { useContext, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { observer } from 'mobx-react-lite'

import { PATH } from './constant'
import { Home, Layout } from './pages'
import { Context } from './main'
import { Page404, Loaders, UserPage, Buttons } from './pages/Navigation'
import styles from './app.module.css'
declare global {
	interface Window {
		ethereum?: any
	}
}

const App = observer(() => {
	const { store } = useContext(Context)

	useEffect(() => {
		if (localStorage.getItem('token')) {
			// store.checkAuth()
		}
	}, [store.checkAuth])

	// const isAuth = store.isAuth

	return (
		<>
			<div className={styles.bg}></div>
			<div className={styles.bg + ' ' + styles.bg2}></div>
			<div className={styles.bg + ' ' + styles.bg3}></div>

			<Routes>
				<Route path={'/'} element={<Layout />}>
					<Route index element={<Home />} />
					<Route path={PATH.LOADERS} element={<Loaders />} />
					<Route path={PATH.BUTTONS} element={<Buttons />} />
					<Route path={`${PATH.USER_PAGE}/:userId`} element={<UserPage />} />
					<Route path={'*'} element={<Page404 />} />
				</Route>
			</Routes>
		</>
	)
})
export default App
