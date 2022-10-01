import { FieldContainer } from 'components/global/Input/components/FieldContainer/FieldContainer';
import { Svg } from 'components/global/Input/components/Svg/Svg';
import { Field } from 'components/global/Input/components/Field/Field';
import { Container } from 'components/global/Input/components/Container/Container';
import { FC, InputHTMLAttributes } from 'react';
import { nanoid } from 'nanoid';
import { Label } from 'components/global/Label/Label';

export enum InputTypes {
  text = 'text',
  email = 'email',
  password = 'password',
}

interface InputProps {
  inputType?: InputTypes;
  inputValue?: string;
  changeHandler?: (value: string) => void;
  labelText?: string;
  svg?: JSX.Element;
  placeholder?: string;
  isEdited?: boolean;
  className?: string;
}

export const Input: FC<InputProps> = ({
  inputType = InputTypes.text,
  inputValue,
  changeHandler,
  labelText,
  svg,
  placeholder,
  isEdited,
  className,
}) => {
  const uniqueInputId = nanoid();

  const fieldProps: InputHTMLAttributes<HTMLInputElement> = {
    id: uniqueInputId,
    type: inputType,
    placeholder,
    value: inputValue,
  };

  if (changeHandler) {
    fieldProps.onChange = (e) => changeHandler(e.target.value);
  }

  return (
    <Container className={className}>
      {labelText && (
        <Label htmlFor={uniqueInputId} $isEdited={isEdited}>
          {labelText}
        </Label>
      )}
      <FieldContainer>
        {svg && (
          <label htmlFor={uniqueInputId}>
            <Svg {...svg.props}>{svg.props.children}</Svg>
          </label>
        )}
        <Field {...fieldProps} />
      </FieldContainer>
    </Container>
  );
};
