import { signInSvg } from 'svg/signInSvg';
import { LinkWithSvg } from 'components/Header/components/LinkWithSvg/LinkWithSvg';

export const LogInLink = () => {
  return (
    <LinkWithSvg to={'/signin'} svg={signInSvg} svgStroked>
      Log in
    </LinkWithSvg>
  );
};
