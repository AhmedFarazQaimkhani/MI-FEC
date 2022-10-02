import { Button } from './button';
import styles from './page-header.module.css';

interface PageHeaderInt {
  title: string;
  handler?: any;
  buttonText?: string;
}

export const PageHeader = (props: PageHeaderInt) => {
  const { handler, title, buttonText } = props;

  return (
    <div className={styles.pageHeader}>
      <h1>{title}</h1>
      {buttonText && (
        <Button primary onClick={handler}>
          {buttonText}
        </Button>
      )}
    </div>
  );
};
