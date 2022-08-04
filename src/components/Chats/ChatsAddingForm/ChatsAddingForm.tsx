import React, { FC, useState } from 'react';
import style from './ChatsAddingForm.module.scss';
import { Button } from '@mui/material';
import { getUsersByName } from 'src/services/firebase/users';

interface ChatsAddingFormProps {
  toggleIsChatsAddingFormVisible: () => void;
}

export const ChatsAddingForm: FC<ChatsAddingFormProps> = ({
  toggleIsChatsAddingFormVisible,
}) => {
  const [input, setInput] = useState('');
  const [contacts, setContacts] = useState<any[]>([]);

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    setContacts(await getUsersByName(e.target.value));
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
            <li key={contact.email} title={contact.email}>
              <a>{contact.name}</a>
            </li>
          ))}
        </ul>
        <Button onClick={toggleIsChatsAddingFormVisible}>X</Button>
      </form>
    </div>
  );
};
