import styles from './page404.module.css';

export const Page404 = () => {
    return (
        <div className={styles.wrapper}>
            <span className={styles.content}>
                &#128531; <br /> Ups... <br /> Page not found
            </span>
        </div>
    );
};
export default Page404;
