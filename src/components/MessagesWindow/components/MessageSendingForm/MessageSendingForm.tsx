import style from './MessageSendingForm.module.scss';
import React, { FC, memo } from 'react';

import { Button } from './components/Button/Button';
import { Input } from './components/Input/Input';
import classNames from 'classnames';

interface MessageFormProps {
  inputValue?: string;
  setInputValue: (value: string) => void;
  isInputDisabled?: boolean;
  onSendMessage: (e: React.FormEvent<HTMLFormElement>) => void;
  borderType?: string;
  angleType?: string;
}

export const MessageSendingForm: FC<MessageFormProps> = memo(
  ({
    inputValue = '',
    setInputValue,
    onSendMessage,
    isInputDisabled = false,
    borderType = 'normal',
    angleType = 'roundish',
  }) => {
    const classes = classNames(
      style['message-form'],
      style[`border-${borderType}`],
      style[`angle-${angleType}`]
    );

    return (
      <form onSubmit={(e) => onSendMessage(e)} className={classes}>
        <Input
          disabled={isInputDisabled}
          value={inputValue}
          setValue={setInputValue}
        />
        <Button disabled={!inputValue} />
      </form>
    );
  }
);
