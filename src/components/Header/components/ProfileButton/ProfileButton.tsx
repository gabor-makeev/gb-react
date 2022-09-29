import { profileSvg } from 'svg/profileSvg';
import { FC } from 'react';
import { HeaderButtonLink } from 'components/Header/components/HeaderButtonLink/HeaderButtonLink';

interface ProfileButtonProps {
  handleOnClick: () => void;
}

export const ProfileButton: FC<ProfileButtonProps> = ({ handleOnClick }) => {
  return (
    <HeaderButtonLink
      svg={profileSvg}
      handleOnClick={handleOnClick}
      svgFilled
      isButton
    >
      Profile
    </HeaderButtonLink>
  );
};
