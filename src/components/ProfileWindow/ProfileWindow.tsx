import React, { FC, useEffect, useRef, useState } from 'react';
import { Container } from 'components/ProfileWindow/components/Container/Container';
import { Form } from 'components/ProfileWindow/components/Form/Form';
import { Button } from 'components/global/Button/Button';
import { Input, InputTypes } from 'components/global/Input/Input';
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
import { getUserDocRef } from 'src/services/firebase/refs';
import { Checkbox } from 'components/global/Checkbox/Checkbox';
import { SignOutButton } from 'components/ProfileWindow/components/SignOutButton/SignOutButton';
import { logOut } from 'src/services/firebase/auth';
import { ErrorNotification } from 'components/global/ErrorNotification/ErrorNotification';

interface ProfileWindowProps {
  toggleProfileWindowState: () => void;
}

export const ProfileWindow: FC<ProfileWindowProps> = ({
  toggleProfileWindowState,
}) => {
  const [nameInput, setNameInput] = useState('');
  const [isPublicInput, setIsPublicInput] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
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
    setIsPublicInput(userProperties.isPublic);
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

    try {
      setLoading(true);

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

      if (isPublicInput !== userProperties.isPublic) {
        setDoc(
          getUserDocRef(userEmail),
          {
            isPublic: isPublicInput,
          },
          { merge: true }
        );
      }
    } catch (err) {
      setError((err as Error).message);
      setTimeout(() => {
        setError('');
      }, 3000);
    } finally {
      setLoading(false);
    }
  };

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === containerRef.current) {
      toggleProfileWindowState();
    }
  };

  const handleSignOut = () => {
    logOut();
    toggleProfileWindowState();
  };

  return (
    <Container ref={containerRef} onClick={(e) => handleContainerClick(e)}>
      {loading && <Loader />}
      {error && <ErrorNotification>{error}</ErrorNotification>}
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
          <Input
            inputValue={nameInput}
            changeHandler={setNameInput}
            inputType={InputTypes.text}
            svg={nameInputSvg}
            labelText={'Name'}
            placeholder={userProperties.name}
            isEdited={!!nameInput && nameInput !== userProperties.name}
          />
          <Checkbox
            labelText={'Public'}
            isChecked={isPublicInput}
            isEdited={isPublicInput !== userProperties.isPublic}
            tickHandler={() => setIsPublicInput(!isPublicInput)}
          />
          <Button>Save</Button>
          <SignOutButton as={'button'} onClick={() => handleSignOut()}>
            Sign out
          </SignOutButton>
        </Form>
      )}
    </Container>
  );
};
