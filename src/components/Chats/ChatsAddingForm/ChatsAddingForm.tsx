import React, { FC, useState } from 'react';
import style from './ChatsAddingForm.module.scss';
import { Timestamp } from 'firebase/firestore';
import { nanoid } from 'nanoid';
import { getAuth } from 'firebase/auth';
import { SearchField } from 'components/Chats/ChatsAddingForm/components/SearchField/SearchField';
import { SearchResults } from 'components/Chats/ChatsAddingForm/components/SearchResults/SearchResults';
import { UserRepository } from 'src/services/firebase/Repository/UserRepository';
import { UserService } from 'src/services/firebase/Service/UserService';
import { IClientUser } from 'src/default-types';

interface ChatsAddingFormProps {
  toggleIsChatsAddingFormVisible: () => void;
}

export const ChatsAddingForm: FC<ChatsAddingFormProps> = ({
  toggleIsChatsAddingFormVisible,
}) => {
  const [input, setInput] = useState('');
  const [contacts, setContacts] = useState<IClientUser[]>([]);

  const userEmail = getAuth().currentUser?.email as string;

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    const users = await UserRepository.getUsersByName(e.target.value);
    const filteredUsers = users.filter((user) => user.email !== userEmail);
    setContacts(filteredUsers);
  };

  const onContactClick = async (contact: IClientUser) => {
    const authUserData = await UserRepository.getUser(userEmail);
    const contactUserData = await UserRepository.getUser(contact.email);

    const [authUserChatWithContact] = authUserData.chats.filter(
      (chat) => chat.toUserEmail === contact.email
    );

    const [contactChatWithAuthUser] = contactUserData.chats.filter(
      (chat) => chat.toUserEmail === userEmail
    );

    const newChatId = nanoid();

    if (!authUserChatWithContact) {
      UserService.addChat(userEmail, {
        name: contact.name,
        toUserEmail: contact.email,
        createdAt: Timestamp.now().toMillis(),
        id: contactChatWithAuthUser ? contactChatWithAuthUser.id : newChatId,
      });
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
