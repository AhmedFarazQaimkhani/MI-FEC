// Packages
import { useState } from 'react';
import Select from 'react-select';
import { Controller } from 'react-hook-form';

// Interfaces
import { Item } from '../common/interfaces';

interface SelectFieldProps {
  name: string;
  control?: any;
  label?: string;
  items: [];
  valueById: any;
  setValue: any;
}
export const ControllerSelectField = ({ name, control, label, items, valueById, setValue }: SelectFieldProps) => {
  const [selectedValue, setSelectedValue] = useState();

  const handleChange = (value: any) => {
    setSelectedValue(value);
    setValue(name, value);
  };

  return (
    <div className={'fieldContainer'}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            onChange={handleChange}
            value={selectedValue ? selectedValue : valueById}
            placeholder={label}
            options={items.map((item: Item) => {
              return { label: item.name, value: item.id, videos: item.videos };
            })}
          />
        )}
      />
    </div>
  );
};
