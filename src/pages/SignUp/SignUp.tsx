import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from 'components/global/AccessPage/Container/Container';
import { Form } from 'components/global/AccessPage/Form/Form';
import { Heading } from 'components/global/Heading/Heading';
import { Text } from 'components/global/Text/Text';
import { BoldHighlightedText } from 'components/global/Text/BoldText/BoldHighlightedText/BoldHighlightedText';
import { BoldText } from 'components/global/Text/BoldText/BoldText';
import { FormContainer } from 'components/global/AccessPage/FormContainer/FormContainer';
import { Input, InputTypes } from 'components/global/Input/Input';
import { nameInputSvg } from 'svg/nameInputSvg';
import { passwordInputSvg } from 'svg/passwordInputSvg';
import { emailInputSvg } from 'svg/emailInputSvg';
import { Button } from 'components/global/Button/Button';
import { Link } from 'components/global/Link/Link';
import { Loader } from 'components/global/Loader/Loader';
import { ErrorNotification } from 'components/global/ErrorNotification/ErrorNotification';
import { AuthService } from 'src/services/firebase/Service/AuthService/AuthService';

export const SignUp: FC = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError('');
      await AuthService.signUp(name, email, password);
      navigate('/signin', { replace: true });
    } catch (err) {
      setError((err as Error).message);

      setTimeout(() => {
        setError('');
      }, 3000);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {loading && <Loader />}
      {error && <ErrorNotification>{error}</ErrorNotification>}
      <Container>
        <FormContainer>
          <Heading>Sign up!</Heading>
          <Text>
            Create an <BoldHighlightedText>account</BoldHighlightedText> to
            access a <BoldText>chat application</BoldText> that is not much
            different from any other <BoldText>chat application</BoldText>
          </Text>
          <Form onSubmit={handleSubmit}>
            <Input
              inputType={InputTypes.text}
              inputValue={name}
              labelText={'Name'}
              placeholder={'Enter your name'}
              changeHandler={setName}
              svg={nameInputSvg}
            />
            <Input
              inputType={InputTypes.email}
              inputValue={email}
              labelText={'Email'}
              placeholder={'Enter your email'}
              changeHandler={setEmail}
              svg={emailInputSvg}
            />
            <Input
              inputType={InputTypes.password}
              inputValue={password}
              labelText={'Password'}
              placeholder={'Enter a secure password'}
              changeHandler={setPassword}
              svg={passwordInputSvg}
            />
            <Button>Sign up</Button>
            <span>
              <Text>Already have an account?</Text>
              <Link to={'/signin'}>Log in</Link>
            </span>
          </Form>
        </FormContainer>
      </Container>
    </>
  );
};
