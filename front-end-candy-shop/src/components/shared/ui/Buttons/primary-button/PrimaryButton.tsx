import {classNames} from "components/shared/lib/classNames/classNames";
import {PropsWithChildren} from "react";
import BaseButton from "../base-button/BaseButton";
import styles from './PrimaryButton.module.scss';

type Props = PropsWithChildren<{
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  onClick: () => void;
}>



const PrimaryButton = ({onClick, children, className = 'default', size = 'md'}: Props) => {

  return (
    <BaseButton
      className={classNames(styles.button, {}, [className, styles[className], styles[size]])}
      onClick={onClick}
    >
      {children}
    </BaseButton>
  );
};

export default PrimaryButton;
