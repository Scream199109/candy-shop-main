import Input from "components/shared/ui/Input/Input";
import useInput from "hooks/useInput";
import {FormEvent, memo} from "react";
import styles from './RegistrationForm.module.scss';

export interface LoginFormProps {
  className?: string;
  onSuccess: () => void;
}
const LoginForm = ({className, onSuccess}: LoginFormProps) => {
  const emailInput = useInput('');
  const passwordInput = useInput('');
  const nameInput = useInput('');
  const phoneInput = useInput('');

  const {value, error, onChange, setError} = useInput('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    validateInput(emailInput)
    validateInput(passwordInput)
    console.log('email ==>', emailInput.value, 'password ==>', passwordInput.value)
  }

  const validateInput = (input: {value: string, setError: (value: boolean) => void}) => {
    if (!input.value.trim()) {
      input.setError(true)
    } else {
      input.setError(false)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.form}>
        <p className={styles.heading}>Регистрация</p>
        <Input
          type="text"
          name='name'
          placeholder='ФИО'
          {...nameInput}
        />

        <Input
          type="number"
          name='phone'
          placeholder='Номер телефона +7...'
          {...phoneInput}
        />

        <Input
          type="email"
          name='email'
          placeholder='Email'
          defaultValue=''
          {...emailInput}
        />

        <Input
          type="password"
          name='password'
          placeholder='Пароль'
          {...passwordInput}
        />
        <div className={styles.footer}>
          <button className={styles.btn}>Отправить</button>
          <p>
            Есть аккаунт? <a className={styles.link} href="">Войти здесь!</a>
          </p>
          <a className={styles.link} href="" />
        </div>
        <a className={styles.link} href="" />
      </form>
    </>
  );
};


export default memo(LoginForm);
