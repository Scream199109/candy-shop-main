'use client'
import LoginIcon from 'assets/icons/LoginIcon';
import LogoutIcon from 'assets/icons/LogoutIcon';
import {AuthType} from 'types/auth.enum';
import styles from './AuthButton.module.scss';

type Props = {
  variant: AuthType;
  onClick: () => void;
}

const AuthButton = ({variant, onClick}: Props) => {
  return (
    <button className={styles.btn} onClick={onClick}>
      <div className={styles.sign}>
        {variant === AuthType.LOGOUT ? <LogoutIcon /> : <LoginIcon />}
      </div>
      <div className={styles.text}>
        {variant === AuthType.LOGOUT ? 'Выйти' : 'Вход'}
      </div>
    </button>
  );
};

export default AuthButton;
