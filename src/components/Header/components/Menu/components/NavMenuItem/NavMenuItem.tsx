import { NavigationItem } from 'src/default-types';
import { FC } from 'react';
import { Link } from 'components/Header/components/Menu/components/NavMenuItem/components/Link/Link';
import { ListItem } from 'components/Header/components/Menu/components/NavMenuItem/components/ListItem/ListItem';

interface NavMenuItemProps {
  navigation: NavigationItem;
  handleClick: () => void;
}

export const NavMenuItem: FC<NavMenuItemProps> = ({
  navigation,
  handleClick,
}) => {
  return (
    <ListItem
      key={navigation.id}
      onClick={() => handleClick()}
      $name={navigation.name.toLowerCase()}
    >
      <Link
        to={navigation.path}
        $name={navigation.name.toLowerCase()}
        className={({ isActive }) => (isActive ? 'active' : '')}
      >
        {navigation.name}
      </Link>
    </ListItem>
  );
};
