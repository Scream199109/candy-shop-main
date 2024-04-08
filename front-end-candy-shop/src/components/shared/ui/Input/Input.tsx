'use client'
import {classNames} from 'components/shared/lib/classNames/classNames';
import {ChangeEvent, InputHTMLAttributes, forwardRef} from 'react';
import styles from './Input.module.scss';

export type InputType = 'text' | 'number' | 'email' | 'password' | 'tel';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  type: InputType;
  label?: string;
  name: string;
  placeholder?: string;
  disabled?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
  helpertext?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => {
    const {
      id,
      type,
      label,
      name,
      placeholder,
      disabled,
      onChange,
      error,
      helpertext,
      ...rest
    } = props;

    const mods: Record<string, boolean> = {
      [styles.incorrect]: !!error
    };

    return (
      <>
        <label className={styles.sub_title} htmlFor={label}>{label}</label>
        <input
          type={type}
          id={id}
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          disabled={disabled}
          className={classNames(styles.input, mods)}
          autoComplete='new-password'
          ref={ref}
          {...rest}
        />
        <p className={styles.warning}> {helpertext && helpertext} </p>
      </>
    );
  });

Input.displayName = 'Input';

export default Input;
