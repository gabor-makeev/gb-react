import { signInSvg } from 'svg/signInSvg';
import { HeaderButtonLink } from 'components/Header/components/HeaderButtonLink/HeaderButtonLink';
import { BASE_URL } from 'src/constants';

export const LogInLink = () => {
  return (
    <HeaderButtonLink to={`${BASE_URL}signin`} svg={signInSvg} svgStroked>
      Log in
    </HeaderButtonLink>
  );
};
