'use client'
import Loader from "components/shared/loader/ui/Loader";
import PrimaryButton from "components/shared/ui/Buttons/primary-button/PrimaryButton";
import {useAuth} from "hooks/useAuth";
import {useState} from "react";
import styles from './Auth.module.scss';
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  const {isLoading} = useAuth();

  return (
    <div className={styles.wrapper}>
      {isLogin ?
        <LoginForm />
        :
        <RegisterForm />
      }
      {isLoading && <Loader />}
      <p>Вы еще не с нами?</p>
      <PrimaryButton
        onClick={() => setIsLogin(!isLogin)}
        className={styles.button}
      >
        {!isLogin ? 'Вход' : 'Регистрация'}
      </PrimaryButton>
    </div>
  )
};

export default Auth;
