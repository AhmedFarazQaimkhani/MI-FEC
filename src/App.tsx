// Packages
import { ToastContainer } from 'react-toastify';

// Components
import { AppRoutes } from './routes/app-routes';

// Styling
import styles from './app.module.css';

// React Toastify css file
import 'react-toastify/dist/ReactToastify.css';

export const App = () => {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <header className={styles.header}>Videos</header>
      <main className={styles.main}>
        <AppRoutes />
      </main>
      <footer className={styles.footer}>VManager Demo v0.0.1</footer>

      <ToastContainer />
    </>
  );
};
