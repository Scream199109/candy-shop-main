'use client'
import Form from "components/shared/ui/Form/Form";
import {InputProps} from "components/shared/ui/Input/Input";
import {useActions} from "hooks/useActions";
import * as yup from 'yup';

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email('Неверный формат Email')
    .required('Обязательное поле'),
  password: yup
    .string()
    .required('Обязательное поле')
    .min(6, "Пароль должен быть минимум 6 символов")
})

const LoginForm = () => {

  const {login} = useActions();

  const onSubmit = (data: any) => {
    return login(data)
  };

  const fields: InputProps[] = [
    {id: 'email', name: 'email', type: 'email', placeholder: 'Email'},
    {id: 'password', name: 'password', type: 'password', placeholder: 'Пароль'},
  ]

  return (
    <Form
      title='Войти'
      submitText='Войти'
      onSubmit={onSubmit}
      validationSchema={loginSchema}
      fields={fields}
    />
  );
};

export default LoginForm;
