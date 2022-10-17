import React, { FC } from 'react';
import style from './SearchResults.module.scss';
import { SearchResult } from 'components/Chats/ChatsAddingForm/components/SearchResults/components/SearchResult/SearchResult';
import { IClientUser } from 'src/default-types';

interface SearchResultsProps {
  contacts: IClientUser[];
  onContactClick: (contact: IClientUser) => void;
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
