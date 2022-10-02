// Packages
import { useState } from 'react';
import Select from 'react-select';
import { Controller } from 'react-hook-form';

// Interfaces
import { Item } from '../common/interfaces';

// Stylings
import styles from './common.module.css';

interface SelectFieldProps {
  name: string;
  control?: any;
  label?: string;
  items: [];
  valueById: any;
  setValue: any;
}

export const ControllerMultiSelectField = ({ name, control, label, items, valueById, setValue }: SelectFieldProps) => {
  const [selectedValue, setSelectedValue] = useState();

  const handleChange = (value: any) => {
    setSelectedValue(value);
    setValue(name, value);
  };

  return (
    <div className={styles.fieldContainer}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            isMulti
            placeholder={label}
            onChange={handleChange}
            value={selectedValue ? selectedValue : valueById}
            options={items.map((item: Item) => {
              return { label: item.name, value: item.id };
            })}
          />
        )}
      />
    </div>
  );
};
