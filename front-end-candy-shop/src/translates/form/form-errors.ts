export const defaultError = 'Поле не заполнено или заполненно неверно';

type FormErrors = {
  [key: string]: string;
}

export const formErrors: FormErrors = {
  'string.empty': 'Поле не может быть пустым',
  'string.max': 'Количество символов превышает максимально допустимое',
  'string.min': 'Количество символов меньше минимально допустимого',
  'date.base': 'Дата не заполнена или заполнена неверно',
  'date.max': 'Дата больше, чем максимально допустимая',
  'date.min': 'Дата меньше, чем минимально допустимая'
}

export default formErrors;
