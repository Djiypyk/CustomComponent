import styles from './Loader.module.css'

export const Loader = () => {
	return (
		<div className={styles.lds_ring}>
			<div />
			<div />
			<div />
			<div />
		</div>
	)
}

export default Loader
