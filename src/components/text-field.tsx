// Packages
import { Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';

// Styling
import styles from './common.module.css';

interface TextFieldProps {
  name: string;
  control?: any;
  label?: string;
}
export const ControllerTextField = ({ name, control, label }: TextFieldProps) => {
  return (
    <div className={styles.fieldContainer}>
      <Controller
        control={control}
        name={name}
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <div>
            <TextField label={label} onChange={onChange} value={value} className={styles.textField} id="outlined-size-small" size="small" />
          </div>
        )}
      />
    </div>
  );
};
