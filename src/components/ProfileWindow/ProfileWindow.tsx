import React, { FC, useEffect, useRef, useState } from 'react';
import { Container } from 'components/ProfileWindow/components/Container/Container';
import { Form } from 'components/ProfileWindow/components/Form/Form';
import { Button } from 'components/global/Button/Button';
import { Input, InputTypes } from 'components/global/Input/Input';
import { nameInputSvg } from 'svg/nameInputSvg';
import { EFirebaseUserProperty, IFirebaseUser } from 'src/default-types';
import { Timestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { Text } from 'components/global/Text/Text';
import { BoldText } from 'components/global/Text/BoldText/BoldText';
import { useSelector } from 'react-redux';
import { selectIsAuth } from 'store/profile/selectors';
import { Loader } from 'components/global/Loader/Loader';
import { FormHeader } from 'components/ProfileWindow/components/FormHeader/FormHeader';
import { Checkbox } from 'components/global/Checkbox/Checkbox';
import { SignOutButton } from 'components/ProfileWindow/components/SignOutButton/SignOutButton';
import { ErrorNotification } from 'components/global/ErrorNotification/ErrorNotification';
import { UserRepository } from 'src/services/firebase/Repository/UserRepository';
import { AuthService } from 'src/services/firebase/Service/AuthService';

interface ProfileWindowProps {
  toggleProfileWindowState: () => void;
}

export const ProfileWindow: FC<ProfileWindowProps> = ({
  toggleProfileWindowState,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [userProperties, setUserProperties] = useState<IFirebaseUser>({
    chats: [],
    createdAt: Timestamp.now(),
    isPublic: false,
    name: '',
  });
  const [formData, setFormData] = useState({
    name: '',
    isPublic: userProperties.isPublic,
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const isAuth = useSelector(selectIsAuth);
  const userEmail = getAuth().currentUser?.email as string;

  const updateFormData = (newData: { name?: string; isPublic?: boolean }) => {
    setFormData((prevState) => ({
      ...prevState,
      ...newData,
    }));
  };

  const handleSetUserProperties = (userProperties: IFirebaseUser) => {
    setLoading(false);
    updateFormData({
      isPublic: userProperties.isPublic,
    });
    setUserProperties(userProperties);
  };

  useEffect(() => {
    setLoading(true);
    if (getAuth().currentUser) {
      return UserRepository.subscribeToUser(userEmail, handleSetUserProperties);
    }
  }, [isAuth]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);

      if (formData.name) {
        UserRepository.setUserProperty(
          userEmail,
          EFirebaseUserProperty.name,
          formData.name
        );
        updateFormData({
          name: '',
        });
      }

      if (formData.isPublic !== userProperties.isPublic) {
        UserRepository.setUserProperty(
          userEmail,
          EFirebaseUserProperty.isPublic,
          formData.isPublic
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
    AuthService.logOut();
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
            inputValue={formData.name}
            changeHandler={(newInputValue) =>
              updateFormData({ name: newInputValue })
            }
            inputType={InputTypes.text}
            svg={nameInputSvg}
            labelText={'Name'}
            placeholder={userProperties.name}
            isEdited={!!formData.name && formData.name !== userProperties.name}
          />
          <Checkbox
            labelText={'Public'}
            isChecked={formData.isPublic}
            isEdited={formData.isPublic !== userProperties.isPublic}
            tickHandler={() => updateFormData({ isPublic: !formData.isPublic })}
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
