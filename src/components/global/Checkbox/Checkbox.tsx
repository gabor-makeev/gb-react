import { Container } from 'components/global/Checkbox/components/Container/Container';
import { Input } from 'components/global/Checkbox/components/Input/Input';
import { FC } from 'react';
import { Field } from 'components/global/Checkbox/components/Field/Field';
import { Label } from 'components/global/Label/Label';

interface CheckboxProps {
  labelText?: string;
  isChecked?: boolean;
  tickHandler: () => void;
  isEdited?: boolean;
  className?: string;
}

export const Checkbox: FC<CheckboxProps> = ({
  labelText,
  isChecked = false,
  tickHandler,
  isEdited,
  className,
}) => {
  return (
    <Container className={className} $isChecked={isChecked}>
      {labelText && (
        <Label
          htmlFor={'checkbox'}
          onClick={() => tickHandler()}
          $isEdited={isEdited}
        >
          {labelText}
        </Label>
      )}
      <Field $isChecked={isChecked} onClick={() => tickHandler()} />
      <Input id={'checkbox'} />
    </Container>
  );
};
