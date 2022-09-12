import { FieldContainer } from 'components/global/Input/components/FieldContainer/FieldContainer';
import { Svg } from 'components/global/Input/components/Svg/Svg';
import { Field } from 'components/global/Input/components/Field/Field';
import { Container } from 'components/global/Input/components/Container/Container';
import { FC } from 'react';

export enum InputTypes {
  text = 'text',
  email = 'email',
  password = 'password',
}

interface InputProps {
  inputType?: InputTypes;
  labelText?: string;
  svg?: JSX.Element;
  placeholder?: string;
}

export const Input: FC<InputProps> = ({
  inputType = InputTypes.text,
  labelText,
  svg,
  placeholder,
}) => {
  return (
    <Container>
      {labelText && <label htmlFor={'field'}>{labelText}</label>}
      <FieldContainer>
        {svg && (
          <label htmlFor={'field'}>
            <Svg {...svg.props}>{svg.props.children}</Svg>
          </label>
        )}
        <Field id={'field'} type={inputType} placeholder={placeholder} />
      </FieldContainer>
    </Container>
  );
};
