import React, { FC } from 'react';
import style from './MessagesWindowHeader.module.scss';
import { NavLink } from 'react-router-dom';

interface MessagesWindowHeaderProps {
  chatName: string;
}

export const MessagesWindowHeader: FC<MessagesWindowHeaderProps> = ({
  chatName,
}) => {
  return (
    <div className={style['messages-window-header']}>
      <NavLink
        to={'/messenger'}
        className={style['messages-window-header__backward-link']}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
      </NavLink>
      <div className={style['messages-window-header__chat-icon']}>
        {chatName[0]}
      </div>
      <span className={style['messages-window-header__chat-name']}>
        {chatName}
      </span>
      <hr />
    </div>
  );
};
