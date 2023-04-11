import { observer } from 'mobx-react-lite'

import { ContainerBlock } from '../../components'
import styles from './Home.module.css'

export const Home = () => {
	return (
		<div className={styles.container}>
			<ContainerBlock>
				<span className={styles.title}>
					This site is for you. <br /> I try to find interesting customization options for <br />
					different components and provide them to you.
				</span>
			</ContainerBlock>
		</div>
	)
}

export default observer(Home)
