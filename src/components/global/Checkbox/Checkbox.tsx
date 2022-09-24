import { Container } from 'components/global/Checkbox/components/Container/Container';
import { Input } from 'components/global/Checkbox/components/Input/Input';
import { FC } from 'react';
import { CheckboxLabel } from 'components/global/Checkbox/components/CheckboxLabel/CheckboxLabel';

interface CheckboxProps {
  labelText?: string;
  isChecked?: boolean;
  tickHandler: () => void;
}

export const Checkbox: FC<CheckboxProps> = ({
  labelText,
  isChecked = false,
  tickHandler,
}) => {
  return (
    <Container>
      {labelText && (
        <CheckboxLabel
          htmlFor={'checkbox'}
          $isChecked={isChecked}
          onClick={() => tickHandler()}
        >
          {labelText}
        </CheckboxLabel>
      )}
      <Input id={'checkbox'} />
    </Container>
  );
};
