import React, { FC, useState } from 'react';
import style from './ChatsAddingForm.module.scss';
import {
  getUserChatByToUserEmail,
  getUsersByName,
} from 'src/services/firebase/users';
import { useDispatch } from 'react-redux';
import { addChat } from 'store/chats/slice';
import { Timestamp } from 'firebase/firestore';
import { nanoid } from 'nanoid';
import { getAuth } from 'firebase/auth';
import { UserProperties } from 'src/default-types';
import { SearchField } from 'components/Chats/ChatsAddingForm/components/SearchField/SearchField';
import { SearchResults } from 'components/Chats/ChatsAddingForm/components/SearchResults/SearchResults';

interface ChatsAddingFormProps {
  toggleIsChatsAddingFormVisible: () => void;
}

export const ChatsAddingForm: FC<ChatsAddingFormProps> = ({
  toggleIsChatsAddingFormVisible,
}) => {
  const [input, setInput] = useState('');
  const [contacts, setContacts] = useState<UserProperties[]>([]);

  const dispatch = useDispatch<any>();
  const userEmail = getAuth().currentUser?.email as string;

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    setContacts(await getUsersByName(e.target.value));
  };

  const onContactClick = async (contact: UserProperties) => {
    const authUserChatWithContact = await getUserChatByToUserEmail(
      userEmail,
      contact.email
    );

    const contactChatWithAuthUser = await getUserChatByToUserEmail(
      contact.email,
      userEmail
    );

    const newChatId = nanoid();

    if (!authUserChatWithContact) {
      dispatch(
        addChat({
          name: contact.name,
          toUserEmail: contact.email,
          createdAt: Timestamp.now().toMillis(),
          id: contactChatWithAuthUser ? contactChatWithAuthUser.id : newChatId,
        })
      );
    }
  };

  const handleContainerClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const { target } = e;
    if ((target as HTMLElement).classList.contains(style.container)) {
      toggleIsChatsAddingFormVisible();
    }
  };

  return (
    <div className={style.container} onClick={(e) => handleContainerClick(e)}>
      <form className={style.form}>
        <SearchField
          inputValue={input}
          handleInputValueChange={handleInputChange}
        />
        {!!contacts.length && (
          <SearchResults contacts={contacts} onContactClick={onContactClick} />
        )}
      </form>
    </div>
  );
};
