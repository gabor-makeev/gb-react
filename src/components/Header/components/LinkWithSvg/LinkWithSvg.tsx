import React, { FC } from 'react';
import { Link } from 'components/Header/components/LinkWithSvg/components/Link/Link';
import { Svg } from 'components/Header/components/LinkWithSvg/components/Svg/Svg';
import { Text } from 'components/Header/components/LinkWithSvg/components/Text/Text';
import { Button } from 'components/Header/components/LinkWithSvg/components/Button/Button';

interface LinkWithSvgProps {
  to?: string;
  svg: JSX.Element;
  children: React.ReactNode;
  svgStroked?: boolean;
  svgFilled?: boolean;
  isButton?: boolean;
  handleOnClick?: () => void;
  className?: string;
}

export const LinkWithSvg: FC<LinkWithSvgProps> = ({
  to = '#',
  svg,
  children,
  svgStroked = false,
  svgFilled = false,
  isButton = false,
  handleOnClick,
  className,
}) => {
  const linkWithSvgChildren = (
    <>
      <Svg {...svg.props} filled={svgFilled} stroked={svgStroked}>
        {svg.props.children}
      </Svg>
      <Text>{children}</Text>
    </>
  );

  const linkWithSvgProps = {
    $svgStroked: svgStroked,
    $svgFilled: svgFilled,
    className,
  };

  const buttonWithSvgProps = Object.assign(
    {
      ...(handleOnClick && { onClick: () => handleOnClick() }),
    },
    linkWithSvgProps
  );

  return (
    <>
      {isButton && (
        <Button {...buttonWithSvgProps} as={'button'}>
          {linkWithSvgChildren}
        </Button>
      )}
      {!isButton && (
        <Link {...linkWithSvgProps} to={to}>
          {linkWithSvgChildren}
        </Link>
      )}
    </>
  );
};
