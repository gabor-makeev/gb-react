import { signInSvg } from 'svg/signInSvg';
import { HeaderButtonLink } from 'components/Header/components/HeaderButtonLink/HeaderButtonLink';

export const LogInLink = () => {
  return (
    <HeaderButtonLink to={'/signin'} svg={signInSvg} svgStroked>
      Log in
    </HeaderButtonLink>
  );
};
