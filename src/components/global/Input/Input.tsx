import { FieldContainer } from 'components/global/Input/components/FieldContainer/FieldContainer';
import { Svg } from 'components/global/Input/components/Svg/Svg';
import { Field } from 'components/global/Input/components/Field/Field';
import { Container } from 'components/global/Input/components/Container/Container';
import { FC, InputHTMLAttributes } from 'react';

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
}

export const Input: FC<InputProps> = ({
  inputType = InputTypes.text,
  inputValue,
  changeHandler,
  labelText,
  svg,
  placeholder,
}) => {
  const fieldProps: InputHTMLAttributes<HTMLInputElement> = {
    id: 'field',
    type: inputType,
    placeholder,
    value: inputValue,
  };

  if (changeHandler) {
    fieldProps.onChange = (e) => changeHandler(e.target.value);
  }

  return (
    <Container>
      {labelText && <label htmlFor={'field'}>{labelText}</label>}
      <FieldContainer>
        {svg && (
          <label htmlFor={'field'}>
            <Svg {...svg.props}>{svg.props.children}</Svg>
          </label>
        )}
        <Field {...fieldProps} />
      </FieldContainer>
    </Container>
  );
};
