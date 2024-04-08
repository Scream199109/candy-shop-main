'use client'
import {useMounted} from 'hooks/useMounted';
import Select from 'react-select';
import {EnumProductSort} from 'services/product/product.types';
import styles from './SortDropdown.module.scss';

const options = (Object.keys(EnumProductSort) as Array<keyof typeof EnumProductSort>).map(key => {
  return {label: EnumProductSort[key], value: EnumProductSort[key]}
})

type Props = {
  onChange: (option: any) => void;
}

const SortDropdown = ({onChange}: Props) => {
  const id = Date.now().toString();
  const isMounted = useMounted();

  if (!isMounted) return null;

  return (
    <div className={styles.wrapper}>
      <Select
        id={id}
        options={options}
        defaultValue={options[2]}
        isSearchable={false}
        onChange={onChange}
      />
    </div>
  );
};

export default SortDropdown;
