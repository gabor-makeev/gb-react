import React, { FC } from 'react';
import style from './SearchResults.module.scss';
import { UserProperties } from 'src/default-types';

interface SearchResultsProps {
  contacts: UserProperties[];
  onContactClick: (contact: UserProperties) => void;
}

export const SearchResults: FC<SearchResultsProps> = ({
  contacts,
  onContactClick,
}) => {
  return (
    <ul className={style['search-results']}>
      {contacts.map((contact) => (
        <li
          key={contact.email}
          title={contact.email}
          className={style['search-results__contact']}
          onClick={() => onContactClick(contact)}
        >
          <div className={style['search-results__contact__icon']}>
            {contact.name[0]}
          </div>
          <a className={style['search-results__contact__name']}>
            {contact.name}
          </a>
        </li>
      ))}
    </ul>
  );
};
