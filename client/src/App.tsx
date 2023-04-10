import { Route, Routes } from 'react-router-dom'
import { PATH } from './constant'
import styles from './app.module.css'

import { Home, Layout, Page404, Loaders } from './pages'

const App = () => {
	return (
		<>
			<div className={styles.bg}></div>
			<div className={styles.bg + ' ' + styles.bg2}></div>
			<div className={styles.bg + ' ' + styles.bg3}></div>

			<Routes>
				<Route path={'/'} element={<Layout />}>
					<Route index element={<Home />} />
					<Route path={PATH.LOADERS} element={<Loaders />} />
					<Route path={'*'} element={<Page404 />} />
				</Route>
			</Routes>
		</>
	)
}

export default App
