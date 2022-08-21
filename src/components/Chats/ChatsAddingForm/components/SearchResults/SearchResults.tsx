import React, { FC } from 'react';
import style from './SearchResults.module.scss';
import { UserProperties } from 'src/default-types';
import { SearchResult } from 'components/Chats/ChatsAddingForm/components/SearchResults/components/SearchResult/SearchResult';

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
        <SearchResult
          contact={contact}
          onContactClick={onContactClick}
          key={contact.email}
        />
      ))}
    </ul>
  );
};
