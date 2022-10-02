// Components
import { AppRoutes } from './routes/app-routes';

// Styling
import styles from './app.module.css';

export const App = () => {
  return (
    <>
      <header className={styles.header}>Videos</header>
      <main className={styles.main}>
        <AppRoutes />
      </main>
      <footer className={styles.footer}>VManager Demo v0.0.1</footer>
    </>
  );
};
