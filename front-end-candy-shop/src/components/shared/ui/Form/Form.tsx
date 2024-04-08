'use client'
import {yupResolver} from '@hookform/resolvers/yup';
import {AUTH_MODAL} from 'consts';
import {useAuth} from 'hooks/useAuth';
import {PropsWithChildren} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import {useDispatch} from 'react-redux';
import {setModalState} from 'store/modal/modal.slice';
import {IEmailPassword, IRegisterData} from 'store/user/user.interface';
import * as yup from 'yup';
import Input, {InputProps} from '../Input/Input';
import styles from './Form.module.scss';

interface FormProps extends PropsWithChildren<{
  onSubmit: SubmitHandler<any>;
  validationSchema: yup.ObjectSchema<any>;
}> {
  title: string;
  submitText: string;
  fields: InputProps[];
}

const Form = ({title, submitText, onSubmit, fields = [], validationSchema}: FormProps) => {

  const {isLoading} = useAuth();

  const {register, handleSubmit, reset, formState: {errors, isValid}} = useForm({
    mode: "onChange",
    resolver: yupResolver(validationSchema)
  });

  const dispatch = useDispatch();

  const onHandleSubmit = async (data: IEmailPassword | IRegisterData) => {

    if (isValid) {
      const response = await onSubmit(data);
      //@ts-ignore  
      if (!response.error && !isLoading) {
        dispatch(setModalState({modal: AUTH_MODAL, isOpen: false}))
        reset();
      }
    }
  }

  return (
    <form noValidate onSubmit={handleSubmit(onHandleSubmit)} className={styles.form}>
      <h2 className={styles.heading}>
        {title}
      </h2>
      {fields.map((field, index) => (
        <div key={index} className={styles.field}>
          <label>{field.label}</label>
          <Input
            {...field}
            {...register(field.name)}
            error={!!errors[field.name]}
          />
          {errors[field.name] && <span className={styles.warning}>{`${errors[field.name]?.message}`}</span>}
        </div>
      ))}
      <button type="submit" className={styles.btn}>
        {submitText}
      </button>
    </form >
  );
};

export default Form;
