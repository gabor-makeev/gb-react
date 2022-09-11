import React, { FC } from 'react';
import { Link } from 'components/Header/components/LinkWithSvg/components/Link/Link';
import { Svg } from 'components/Header/components/LinkWithSvg/components/Svg/Svg';
import { Text } from 'components/Header/components/LinkWithSvg/components/Text/Text';

interface LinkWithSvgProps {
  to: string;
  svg: JSX.Element;
  children: React.ReactNode;
  svgStroked?: boolean;
  svgFilled?: boolean;
}

export const LinkWithSvg: FC<LinkWithSvgProps> = ({
  to,
  svg,
  children,
  svgStroked = false,
  svgFilled = false,
}) => {
  return (
    <Link to={to} $svgStroked={svgStroked} $svgFilled={svgFilled}>
      <Svg {...svg.props} filled={svgFilled} stroked={svgStroked}>
        {svg.props.children}
      </Svg>
      <Text>{children}</Text>
    </Link>
  );
};
