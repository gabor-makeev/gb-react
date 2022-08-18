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

  return (
    <div className={style.container}>
      <form className={style.form}>
        <label>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-search"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            type="text"
            onChange={(e) => handleInputChange(e)}
            value={input}
          />
        </label>
        <ul>
          {contacts.map((contact) => (
            <li
              key={contact.email}
              title={contact.email}
              onClick={() => onContactClick(contact)}
            >
              <a>{contact.name}</a>
            </li>
          ))}
        </ul>
      </form>
    </div>
  );
};
