import React, { FC } from 'react';
import { Link } from 'components/Header/components/LinkWithSvg/components/Link/Link';
import { Svg } from 'components/Header/components/LinkWithSvg/components/Svg/Svg';
import { Text } from 'components/Header/components/LinkWithSvg/components/Text/Text';

interface LinkWithSvgProps {
  to: string;
  svg: JSX.Element;
  children: React.ReactNode;
}

export const LinkWithSvg: FC<LinkWithSvgProps> = ({ to, svg, children }) => {
  return (
    <Link to={to}>
      <Svg {...svg.props}>{svg.props.children}</Svg>
      <Text>{children}</Text>
    </Link>
  );
};
