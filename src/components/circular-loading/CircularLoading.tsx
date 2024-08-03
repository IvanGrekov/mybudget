import styles from 'components/circular-loading/CircularLoading.module.scss';

interface ICircularLoadingProps {
    size?: number;
}

export default function CircularLoading({
    size = 44,
}: ICircularLoadingProps): JSX.Element {
    return (
        <div
            className={styles['circular-loading-wrapper']}
            style={{ width: size, height: size }}
        >
            <div className={styles['circular-loading']} />
        </div>
    );
}
