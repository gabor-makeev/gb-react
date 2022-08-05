import React, { FC, useState } from 'react';
import style from './ChatsAddingForm.module.scss';
import { Button } from '@mui/material';
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
    if (!(await getUserChatByToUserEmail(userEmail, contact.email))) {
      dispatch(
        addChat({
          name: contact.name,
          toUserEmail: contact.email,
          createdAt: Timestamp.now().toMillis(),
          id: nanoid(),
        })
      );
    }
  };

  return (
    <div className={style.container}>
      <form className={style.form}>
        <p>Chats adding form</p>
        <label>
          Enter contact name
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
        <Button onClick={toggleIsChatsAddingFormVisible}>X</Button>
      </form>
    </div>
  );
};
