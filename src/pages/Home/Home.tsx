import { observer } from 'mobx-react-lite'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'

import styles from './Home.module.css'

import { ContainerBlock } from '../../components'

export const Home = () => {
	const containerBlockRef = useRef(null)

	useEffect(() => {
		gsap.fromTo(
			containerBlockRef.current,
			{
				duration: 1,
				opacity: 0,
				y: -40,
			},
			{ opacity: 1, y: 0 },
		)
	}, [])

	return (
		<div className={styles.container}>
			<ContainerBlock forwardedRef={containerBlockRef}>
				<span className={styles.title}>
					This site is for you. <br /> I try to find interesting customization
					options for <br />
					different components and provide them to you.
				</span>
			</ContainerBlock>
		</div>
	)
}
export default observer(Home)
