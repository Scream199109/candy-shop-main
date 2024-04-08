import HouseUserIcon from "assets/icons/HouseUserIcon";
import LogoutIcon from "assets/icons/LogoutIcon";
import UserIcon from "assets/icons/UserIcon";
import {MenuItem} from "components/shared/ui/Dropdown/ui/DropDownMenu";
import {EXIT} from "consts";
import {useActions} from "hooks/useActions";
import dynamic from "next/dynamic";
import {PROFILE} from "services/user/user.types";
import styles from './ProfileMenu.module.scss';
const DropDownMenu = dynamic(() => import('components/shared/ui/Dropdown/ui/DropDownMenu'), {ssr: false});

const items: MenuItem[] = [
  {
    id: PROFILE,
    icon: <UserIcon />,
    label: 'Личный кабинет',
    href: '/profile'
  },
  {
    id: EXIT,
    icon: <LogoutIcon />,
    label: 'Выход'
  }
]

const ProfileMenu = () => {

  const {logout} = useActions();

  const onChangeHandler = (id: string) => {
    switch (id) {
      case EXIT:
        logout();
        break;
    }
  }

  return (
    <DropDownMenu
      items={items}
      onChange={onChangeHandler}
      buttonClassName={styles.button}
    >
      <HouseUserIcon />
    </DropDownMenu>
  );
};

export default ProfileMenu;
