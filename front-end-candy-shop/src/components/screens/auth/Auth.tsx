'use client'
import Form from "components/shared/ui/Form/Form";
import {InputProps} from "components/shared/ui/Input/Input";
import {useActions} from "hooks/useActions";
import useInput from "hooks/useInput";
import {useState} from "react";
import {SubmitHandler} from "react-hook-form";
import {IEmailPassword} from "store/user/user.interface";

type AuthType = 'login' | 'register';

export interface InputValidateParams {
  required?: boolean;
  minLength?: number;
}

const passwordParams: InputValidateParams = {
  required: true,
  minLength: 6
}

type Props = {
  setIsOpen?: (cond: boolean) => void;
}

const Auth = ({setIsOpen}: Props) => {
  const [type, setType] = useState<AuthType>('register');

  const nameInput = useInput('');
  const emailInput = useInput('');
  const passwordInput = useInput('');
  const phoneInput = useInput('');

  // const {isLoading} = useAuth();

  const {login, register} = useActions();


  const onSubmit: SubmitHandler<IEmailPassword> = (data) => {
    if (type === 'login') {
      login(data)
    } else {
      register(data)
    }
    setIsOpen && setIsOpen(false)
  }
  const fields: InputProps[] = [
    {id: '1', type: "text", name: 'name', placeholder: 'ФИО', params: passwordParams, ...nameInput},
    {id: '2', type: "email", name: 'email', placeholder: 'Email', params: {required: true}, ...emailInput},
    {id: '3', type: "password", name: 'password', placeholder: 'Пароль', params: {required: true}, ...passwordInput},
    {id: '4', type: "tel", name: 'phone', placeholder: 'Номер телефона +7...', params: {required: true}, ...phoneInput}
  ]

  return (
    <Form
      title="Регистрация"
      fields={fields}
      submitText="Отправить"
      onSubmit={onSubmit}
    />
  )
};

export default Auth;
