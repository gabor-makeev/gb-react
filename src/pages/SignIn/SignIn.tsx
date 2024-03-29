import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader } from 'components/global/Loader/Loader';
import { ErrorNotification } from 'components/global/ErrorNotification/ErrorNotification';
import { Container } from 'components/global/AccessPage/Container/Container';
import { FormContainer } from 'components/global/AccessPage/FormContainer/FormContainer';
import { Form } from 'components/global/AccessPage/Form/Form';
import { Input, InputTypes } from 'components/global/Input/Input';
import { emailInputSvg } from 'svg/emailInputSvg';
import { passwordInputSvg } from 'svg/passwordInputSvg';
import { Button } from 'components/global/Button/Button';
import { Heading } from 'components/global/Heading/Heading';
import { Text } from 'components/global/Text/Text';
import { BoldText } from 'components/global/Text/BoldText/BoldText';
import { Link } from 'components/global/Link/Link';
import { AuthService } from 'src/services/firebase/Service/AuthService';
import { BASE_URL } from 'src/constants';

export const SignIn: FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError('');
      await AuthService.logIn(email, password);
      navigate(`${BASE_URL}messenger`, { replace: true });
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
          <Heading>Sign in!</Heading>
          <Text>
            Sign in to access a <BoldText>chat application</BoldText> that is
            not much different from any other{' '}
            <BoldText>chat application</BoldText>
          </Text>
          <Form onSubmit={handleSubmit}>
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
              placeholder={'Enter your password'}
              changeHandler={setPassword}
              svg={passwordInputSvg}
            />
            <Button>Sign in</Button>
            <span>
              <Text>Don’t have an account?</Text>
              <Link to={`${BASE_URL}signup`}>Sign up</Link>
            </span>
          </Form>
        </FormContainer>
      </Container>
    </>
  );
};
