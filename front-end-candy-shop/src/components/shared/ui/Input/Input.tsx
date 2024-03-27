'use client'
import {InputValidateParams} from 'components/screens/auth/Auth';
import {ChangeEvent, InputHTMLAttributes, forwardRef} from 'react';
import styles from './Input.module.scss';

export type InputType = 'text' | 'number' | 'email' | 'password' | 'tel';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  type: InputType;
  label?: string;
  value: string | number;
  name: string;
  placeholder: string;
  disabled?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  params?: InputValidateParams;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => {
    const {
      id,
      type,
      label,
      value,
      name,
      placeholder,
      disabled,
      onChange,
      ...rest
    } = props;

    return (
      <>
        <label className={styles.sub_title} htmlFor={label}>{label}</label>
        <input
          type={type}
          id={id}
          value={value}
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          disabled={disabled}
          className={styles.input}
          autoComplete='new-password'
          ref={ref}
          {...rest}
        />
      </>
    );
  });

Input.displayName = 'Input';

export default Input;
