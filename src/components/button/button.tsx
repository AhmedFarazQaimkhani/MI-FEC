import type { ButtonHTMLAttributes } from 'react';

import styles from './button.module.css';

type ButtonProps = {
  primary?: boolean;
  secondary?: boolean;
  danger?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({ primary, secondary, danger, ...props }: ButtonProps) => {
  let className = styles.button;
  if (primary) {
    className += ` ${styles.primary}`;
  } else if (secondary) {
    className += ` ${styles.secondary}`;
  } else {
    className += ` ${styles.danger}`;
  }

  return <button className={className} {...props} />;
};
