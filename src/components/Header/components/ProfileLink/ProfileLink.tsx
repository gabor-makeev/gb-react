import { profileSvg } from 'svg/profileSvg';
import { LinkWithSvg } from 'components/Header/components/LinkWithSvg/LinkWithSvg';

export const ProfileLink = () => {
  return (
    <LinkWithSvg to={'/profile'} svg={profileSvg} svgFilled>
      Profile
    </LinkWithSvg>
  );
};
