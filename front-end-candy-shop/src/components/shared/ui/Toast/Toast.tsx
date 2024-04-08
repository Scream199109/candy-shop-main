import {ToastPosition, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export interface ToastOptions {
  position?: ToastPosition;
  autoClose?: number;
  hideProgressBar?: boolean;
  closeOnClick?: boolean;
  pauseOnHover?: boolean;
  draggable?: boolean;
}

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastProps {
  message?: string;
  type?: ToastType;
  options?: ToastOptions;
}

const Toast = ({message = "Default message", type = "success", options = {}}: ToastProps) => {

  const toastOptions: ToastOptions = {
    position: "bottom-left", // Set default position to bottom-right
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    ...options // Merge any additional options passed in with the defaults
  };

  const showToast = () => {
    switch (type) {
      case "info":
        toast.info(message, toastOptions);
        break;
      case "success":
        toast.success(message, toastOptions);
        break;
      case "error":
        toast.error(message, toastOptions);
        break;
      case "warning":
        toast.warning(message, toastOptions);
        break;
      default:
        toast.error("Something went wrong", toastOptions);
    }
  }
  showToast()
  return null;
};


export default Toast;
