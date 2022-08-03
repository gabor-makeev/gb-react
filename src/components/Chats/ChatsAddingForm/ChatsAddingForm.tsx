import { FC } from 'react';
import style from './ChatsAddingForm.module.scss';
import { Button } from '@mui/material';

interface ChatsAddingFormProps {
  toggleIsChatsAddingFormVisible: () => void;
}

export const ChatsAddingForm: FC<ChatsAddingFormProps> = ({
  toggleIsChatsAddingFormVisible,
}) => {
  return (
    <div className={style.container}>
      <form className={style.form}>
        <p>Chats adding form</p>
        <Button onClick={toggleIsChatsAddingFormVisible}>X</Button>
      </form>
    </div>
  );
};
