import LoaderIcon from 'assets/icons/LoaderIcon';
import styles from './Loader.module.scss';

const Loader = () => {
  return (
    <div className={styles.loading}>
      <LoaderIcon className={styles.svgbox} />
    </div>
  );
};

export default Loader;
