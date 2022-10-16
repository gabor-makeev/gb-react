import React, { FC } from 'react';
import style from './SearchResult.module.scss';
import { IClientUser } from 'src/default-types';

interface SearchResultProps {
  contact: IClientUser;
  onContactClick: (contact: IClientUser) => void;
}

export const SearchResult: FC<SearchResultProps> = ({
  contact,
  onContactClick,
}) => {
  return (
    <li
      title={contact.email}
      className={style.contact}
      onClick={() => onContactClick(contact)}
    >
      <div className={style['contact__icon']}>{contact.name[0]}</div>
      <a className={style['contact__name']}>{contact.name}</a>
    </li>
  );
};
