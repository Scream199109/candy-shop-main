import Toast, {ToastType} from "components/shared/ui/Toast/Toast";

const defaultMessage = 'Ошибка';

export const emitToast = (type: ToastType, message = defaultMessage) => {
  return Toast({type, message});
}
