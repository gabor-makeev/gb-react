import { Container } from 'components/global/LabledCheckbox/components/Container/Container';
import { Input } from 'components/global/LabledCheckbox/components/Input/Input';
import { FC } from 'react';
import { Checkbox } from 'components/global/LabledCheckbox/components/Checkbox/Checkbox';
import { Label } from 'components/global/Label/Label';

interface CheckboxProps {
  labelText?: string;
  isChecked?: boolean;
  tickHandler: () => void;
  className?: string;
}

export const LabledCheckbox: FC<CheckboxProps> = ({
  labelText,
  isChecked = false,
  tickHandler,
  className,
}) => {
  return (
    <Container className={className} $isChecked={isChecked}>
      {labelText && (
        <Label htmlFor={'checkbox'} onClick={() => tickHandler()}>
          {labelText}
        </Label>
      )}
      <Checkbox $isChecked={isChecked} onClick={() => tickHandler()} />
      <Input id={'checkbox'} />
    </Container>
  );
};
