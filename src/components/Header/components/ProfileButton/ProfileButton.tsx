import { profileSvg } from 'svg/profileSvg';
import { LinkWithSvg } from 'components/Header/components/LinkWithSvg/LinkWithSvg';
import { FC } from 'react';

interface ProfileButtonProps {
  handleOnClick: () => void;
}

export const ProfileButton: FC<ProfileButtonProps> = ({ handleOnClick }) => {
  return (
    <LinkWithSvg
      svg={profileSvg}
      handleOnClick={handleOnClick}
      svgFilled
      isButton
    >
      Profile
    </LinkWithSvg>
  );
};
