import { NavigationItem } from 'src/default-types';
import { FC } from 'react';
import { Link } from 'components/Header/components/Menu/components/NavMenuItem/components/Link';

interface NavMenuItemProps {
  navigation: NavigationItem;
  handleClick: () => void;
}

export const NavMenuItem: FC<NavMenuItemProps> = ({
  navigation,
  handleClick,
}) => {
  return (
    <li
      key={navigation.id}
      className={'list-item'}
      onClick={() => handleClick()}
    >
      <Link
        to={navigation.path}
        $name={navigation.name.toLowerCase()}
        className={({ isActive }) => (isActive ? 'active' : '')}
      >
        {navigation.name}
      </Link>
    </li>
  );
};
