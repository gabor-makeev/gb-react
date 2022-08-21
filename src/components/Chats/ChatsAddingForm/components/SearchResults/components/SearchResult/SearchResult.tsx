import React, { FC } from 'react';
import { UserProperties } from 'src/default-types';
import style from './SearchResult.module.scss';

interface SearchResultProps {
  contact: UserProperties;
  onContactClick: (contact: UserProperties) => void;
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
