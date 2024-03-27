'use client'
import Auth from 'components/screens/auth/Auth';
import AuthButton from 'components/shared/ui/Button/auth-button/AuthButton';
import {Modal} from 'components/shared/ui/Modal/Modal';
import {useState} from 'react';
import styles from './Header.module.scss';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          <li className={styles.navLink} >
            <a href="">Каталог</a>
          </li>
          <li className={styles.navLink} >
            <a href="">О Магазине</a>
          </li>
          <li className={styles.navLink} >
            <a href="">Контакты</a>
          </li>
          <li className={styles.navLink} >
            <a href="">Доставка</a>
          </li>
          <li className={styles.navLink} >
            <a href="">Оплата</a>
          </li>
          <li className={styles.navLink} >
            <a href=""> Личный кабинет</a>
          </li>
        </ul>
      </nav>

      <div className={styles.auth}>
        <AuthButton variant='login' onClick={() => setIsOpen(true)} />
      </div>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <Auth setIsOpen={setIsOpen}/>
      </Modal>
    </header>
  );
};

export default Header;
