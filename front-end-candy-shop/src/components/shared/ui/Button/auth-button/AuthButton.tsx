import LoginIcon from '../../../../../../assets/icons/Login';
import LogoutIcon from '../../../../../../assets/icons/Logout';
import styles from './AuthButton.module.scss';

type Props = {
  variant: 'login' | 'logout';
  onClick: () => void;
}

const AuthButton = ({variant, onClick}: Props) => {
  return (
    <button className={styles.btn} onClick={onClick}>
      <div className={styles.sign}>
        {variant === 'logout' ? <LogoutIcon /> : <LoginIcon />}
      </div>
      <div className={styles.text}>
        {variant === 'logout' ? 'Выход' : 'Вход'}
      </div>
    </button>
  );
};

export default AuthButton;
