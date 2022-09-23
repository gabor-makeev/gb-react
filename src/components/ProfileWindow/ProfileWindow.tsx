import React, { FC, useEffect, useRef, useState } from 'react';
import { Container } from 'components/ProfileWindow/components/Container/Container';
import { Form } from 'components/ProfileWindow/components/Form/Form';
import { Button } from 'components/global/Button/Button';
import { InputTypes } from 'components/global/Input/Input';
import { nameInputSvg } from 'svg/nameInputSvg';
import { subscribeToUserProperties } from 'src/services/firebase/users';
import { UserProperties } from 'src/default-types';
import { setDoc, Timestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { Text } from 'components/global/Text/Text';
import { BoldText } from 'components/global/Text/BoldText/BoldText';
import { useSelector } from 'react-redux';
import { selectIsAuth } from 'store/profile/selectors';
import { Loader } from 'components/global/Loader/Loader';
import { FormHeader } from 'components/ProfileWindow/components/FormHeader/FormHeader';
import { StyledInput } from 'components/ProfileWindow/components/StyledInput/StyledInput';
import { getUserDocRef } from 'src/services/firebase/refs';

interface ProfileWindowProps {
  toggleProfileWindowState: () => void;
}

export const ProfileWindow: FC<ProfileWindowProps> = ({
  toggleProfileWindowState,
}) => {
  const [nameInput, setNameInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [userProperties, setUserProperties] = useState<UserProperties>({
    chats: [],
    createdAt: Timestamp.now(),
    isPublic: false,
    name: '',
    email: '',
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const isAuth = useSelector(selectIsAuth);
  const userEmail = getAuth().currentUser?.email as string;

  const handleSetUserProperties = (userProperties: UserProperties) => {
    setLoading(false);
    setUserProperties(userProperties);
  };

  useEffect(() => {
    setLoading(true);
    if (getAuth().currentUser) {
      return subscribeToUserProperties(handleSetUserProperties);
    }
  }, [isAuth]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (nameInput) {
      setDoc(
        getUserDocRef(userEmail),
        {
          name: nameInput,
        },
        { merge: true }
      );
      setNameInput('');
    }
  };

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === containerRef.current) {
      toggleProfileWindowState();
    }
  };

  return (
    <Container ref={containerRef} onClick={(e) => handleContainerClick(e)}>
      {loading && <Loader />}
      {!loading && (
        <Form onSubmit={handleSubmit}>
          <FormHeader>
            <Text>
              Hello, <BoldText>{userProperties.name}</BoldText> 👋
            </Text>
            <Text>
              This is your <BoldText>profile</BoldText>
            </Text>
            <Text>
              Your email — <BoldText>{userEmail}</BoldText>
            </Text>
          </FormHeader>
          <StyledInput
            inputValue={nameInput}
            changeHandler={setNameInput}
            inputType={InputTypes.text}
            svg={nameInputSvg}
            labelText={'Name'}
            placeholder={userProperties.name}
          />
          <Button>Save</Button>
        </Form>
      )}
    </Container>
  );
};
