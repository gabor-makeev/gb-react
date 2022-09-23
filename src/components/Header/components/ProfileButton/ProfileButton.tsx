import { profileSvg } from 'svg/profileSvg';
import { LinkWithSvg } from 'components/Header/components/LinkWithSvg/LinkWithSvg';
import { FC } from 'react';

interface ProfileButtonProps {
  toggleProfileWindowState: () => void;
}

export const ProfileButton: FC<ProfileButtonProps> = ({
  toggleProfileWindowState,
}) => {
  return (
    <div onClick={() => toggleProfileWindowState()}>
      <LinkWithSvg svg={profileSvg} svgFilled isButton>
        Profile
      </LinkWithSvg>
    </div>
  );
};
