import Form from "components/shared/ui/Form/Form";
import {InputProps} from "components/shared/ui/Input/Input";
import {useActions} from "hooks/useActions";
import {phoneRegExp} from "utils/phone-regex-validate";
import * as yup from 'yup';

const schema = yup.object().shape({
  email: yup
    .string()
    .email('Неверный формат Email')
    .required('Обязательное поле'),
  password: yup
    .string()
    .required('Обязательное поле')
    .min(6, "Пароль должен быть минимум 6 символов"),
  name: yup
    .string()
    .required('Обязательное поле'),
  phone: yup
    .string()
    .required('Обязательное поле')
    .matches(phoneRegExp, 'Номер не валидный')
})

const RegisterForm = () => {

  const {register} = useActions();

  const onSubmit = async (data: any) => {
    return await register(data);
  }

  const fields: InputProps[] = [
    {id: 'name', name: 'name', type: 'text', placeholder: 'ФИО'},
    {id: 'email', name: 'email', type: 'email', placeholder: 'Email'},
    {id: 'password', name: 'password', type: 'password', placeholder: 'Пароль'},
    {id: 'phone', name: 'phone', type: 'tel', placeholder: 'Телефон 79...'}
  ]

  return (
    <Form
      title='Регистрация'
      submitText='Отправить'
      onSubmit={onSubmit}
      validationSchema={schema}
      fields={fields}
    />
  );
};

export default RegisterForm;
