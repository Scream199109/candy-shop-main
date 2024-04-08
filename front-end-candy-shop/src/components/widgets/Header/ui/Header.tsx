'use client'
import Auth from 'components/widgets/auth/Auth';
const AuthButton = dynamic(() => import('components/shared/ui/Buttons/auth-button/AuthButton'), {ssr: false});

import {Modal} from 'components/shared/ui/Modal/Modal';
import ProfileMenu from 'components/widgets/ProfileMenu/ProfileMenu';
import {AUTH_MODAL} from 'consts';
import {useAuth} from 'hooks/useAuth';
import dynamic from 'next/dynamic';
import {useDispatch, useSelector} from 'react-redux';
import {setModalState} from 'store/modal/modal.slice';
import {AuthType} from 'types/auth.enum';
import styles from './Header.module.scss';

const Header = () => {
  const dispatch = useDispatch();

  //@ts-ignore
  const isOpen = useSelector(state => state.modals[AUTH_MODAL]?.isOpen)
  const {user} = useAuth();

  const onClickAuthHandler = () => {
    dispatch(setModalState({modal: AUTH_MODAL, isOpen: true}));
  }

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
        </ul>
      </nav>

      <div className={styles.auth}>
        {
          user ?
            <ProfileMenu />
            :
            <AuthButton variant={AuthType.LOGIN} onClick={onClickAuthHandler} />
        }
      </div>

      <Modal isOpen={isOpen} onClose={() => dispatch(setModalState({modal: AUTH_MODAL, isOpen: false}))}>
        <Auth />
      </Modal>
    </header>
  );
};

export default Header;
