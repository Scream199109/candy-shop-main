'use client'
import {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import formErrors, {defaultError} from 'translates/form/form-errors';
import Input, {InputProps} from '../Input/Input';
import styles from './Form.module.scss';

interface FormProps {
  title: string;
  fields: InputProps[];
  submitText: string;
  // onSubmit: (formData: {[key: string]: string}) => void;
  onSubmit: (formData: any) => void;
}

const Form = ({title, fields, submitText, onSubmit}: FormProps) => {

  const {register, handleSubmit, reset, formState: {errors, isSubmitSuccessful}} = useForm();

  const onSubmitHandler = (data: any) => {
    onSubmit(data);
    // reset();
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset()
    }
  }, [isSubmitSuccessful, reset])

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} className={styles.form}>
      <h2 className={styles.heading}>
        {title}
      </h2>
      {fields.map(field => {
        const errorType = errors[field.name]?.type;
        let error: string | undefined;
        if (typeof errorType === 'string') {
          error = formErrors[errorType] || defaultError;
        }

        return (
          <div key={field.id} className={styles.field}>
            <label htmlFor={field.id}>{field.label}</label>
            <Input
              // TODO Разобраться с params. почему то не видит minLength
              {...register(field.name, {...field.params})}
              id={field.id}
              type={field.type}
              name={field.name}
              placeholder={field.placeholder}
              value={field.value}
              onChange={field.onChange}
            />
            {errors[field.name] && <p style={{color: 'red'}}>{error}</p>}
          </div>
        )
      })
      }
      <button type="submit" className={styles.btn}>
        {submitText}
      </button>
    </form >
  );
};

export default Form;
